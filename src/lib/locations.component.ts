// entry component for the client
import { Component, OnInit, ViewChild } from '@angular/core';
import { select, Store } from '../../../../midgard/modules/store/store';
import { circleMarker, icon, latLng, marker, tileLayer } from 'leaflet';
import { FormComponent } from '../../../../midgard/modules/form/form.component';
import { setTopBarOptions } from '../../../../midgard/state/top-bar/top-bar.actions';
import { getAllLocations, getLocationsLoaded } from './state/locations.selectors';
import { HttpService } from '../../../../midgard/modules/http/http.service';
import { countries } from './countries';
import { Observable, Subscription } from 'rxjs';
import { CrudComponent } from '../../../../midgard/modules/crud/crud.component';
import { Location } from './state/location.model';
import { map } from 'rxjs/operators';

@Component({
  selector: 'lib-locations',
  templateUrl: './locations.component.html',
  styleUrls: ['./locations.component.scss']
})
export class LocationsComponent implements OnInit {
  @ViewChild('locationsForm') locationsForm: FormComponent;
  @ViewChild('crud') crud: CrudComponent;

  private tableOptions;
  protected formFields;
  protected crudLoadedSelector = getLocationsLoaded;
  protected crudDataSelector = getAllLocations;
  protected showSave = false;
  private marker = marker([ 52.5200, 13.4050 ], {
    icon: icon({
      iconSize: [ 25, 41 ],
      iconAnchor: [ 13, 41 ],
      iconUrl: 'assets/leaflet/marker-icon.png',
      shadowUrl: 'assets/leaflet/marker-shadow.png'
    }), draggable: true});
  private options: any = {
    layers: [
      this.marker,
      tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 18, minZoom: 2, attribution: 'Midgard' }),
    ],
    zoom: 4,
    center: latLng(52.5200, 13.4050)
  };
  constructor(
    private store: Store<any>,
    private httpService: HttpService,
  ) {}
  ngOnInit() {
    this.store.dispatch(setTopBarOptions(null));
    this.defineFormFields();
    this.defineTableOptions();
    this.marker.on('dragend', (evt) => {
      this.fillLocationForm(evt.target._latlng.lat, evt.target._latlng.lng);
    });
  }

  /**
   * add the markers of the existing locations on the map
   * @param {Location[]} locations - current locations
   */
  addMarkersOnMap(locations: Location[]) {
    if (locations) {
      // reset markers
      this.options.layers = [this.marker, tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 18, minZoom: 2, attribution: 'Midgard' })];
      locations.forEach((location: Location) => {
        const locationMarker = circleMarker(latLng(Number(location.latitude), Number(location.longitude)), {color: 'green', className: location.uuid});
        locationMarker.on('click', (event) => {
          this.onMarkerClicked(event);
        });
        this.options.layers.push(locationMarker);
      });
    }
  }

  /**
   * defines form fields of the detail view
   */
  defineFormFields() {
    this.formFields = [
      {label: 'Lat.', controlName: 'latitude', type: 'text'},
      {label: 'Lng.', controlName: 'longitude', type: 'text'},
      {label: 'Street', controlName: 'address_line1', type: 'text'},
      {label: 'City/State', controlName: 'city', type: 'text'},
      {label: 'Postcode', controlName: 'postcode', type: 'text'},
      {label: 'Country', controlName: 'country', type: 'nativeDropdown', options: countries}
    ];
  }

  private defineTableOptions() {
    this.tableOptions = {
      columns: [
        {name: 'Street', prop: 'address_line1', cellTemplate: 'edit', flex: 2, sortable: true, filtering: true},
        {name: 'City/State', prop: 'city', cellTemplate: 'edit', flex: 2, sortable: true, filtering: true},
        {name: 'Country', prop: 'country', cellTemplate: 'edit', flex: 2, sortable: true, filtering: false},
        {name: 'Postcode', prop: 'postcode', cellTemplate: 'edit', flex: 2, sortable: true, filtering: false},
        {name: '', cellTemplate: 'actions', actions: [{label: '•••', value: '•••'}, {label: 'Delete', value: 'delete'}], prop: 'is_active', flex: 2},
      ]
    };
  }

  /**
   * moves the marker to given coordinates
   */
  protected moveMarker(lat: number, lng: number) {
    this.marker.setLatLng(latLng(lat, lng));
    this.options.center = latLng(lat, lng);
  }

  /**
   * fills the location form data from a given coordinates
   */
  private fillLocationForm(lat: number, lng: number) {
    this.showSave = true;
    this.locationsForm.detailsForm.get('latitude').patchValue(lat);
    this.locationsForm.detailsForm.get('longitude').patchValue(lng);
    this.getAddressFromLatLng(lat, lng).subscribe(address => {
      this.locationsForm.detailsForm.get('address_line1').patchValue(address.street || address.road);
      this.locationsForm.detailsForm.get('city').patchValue(address.city || address.state);
      this.locationsForm.detailsForm.get('country').patchValue(address.country_code.toUpperCase());
      this.locationsForm.detailsForm.get('postcode').patchValue(address.postcode);
    });
  }

  /**
   * sends an action to create the location and resets the form
   */
  createLocation() {
    this.locationsForm.createItem(this.locationsForm.detailsForm.value);
    this.locationsForm.detailsForm.reset();
    this.showSave = false;
  }

  /**
   * It moves the marker to the location that the user searched and fills the form, and shows button to save marker
   */
  protected onSearch() {
    this.locationsForm.detailsForm.get('latitude').patchValue('');
    this.locationsForm.detailsForm.get('longitude').patchValue('');
    this.getLatLngFromAddress(
      this.locationsForm.detailsForm.get('address_line1').value,
      this.locationsForm.detailsForm.get('city').value,
      this.locationsForm.detailsForm.get('country').value,
      this.locationsForm.detailsForm.get('postcode').value)
      .subscribe(res => {
        this.locationsForm.detailsForm.get('latitude').patchValue(res[0].lat);
        this.locationsForm.detailsForm.get('longitude').patchValue(res[0].lon);
        this.moveMarker(res[0].lat, res[0].lon);
        this.showSave = true;
      });
  }

  /**
   * a function that is triggered with the user clicks on an item in the table and its purpose is to set the location form values with this item
   * @param item - the selected item
   */
  protected onLocationClicked(item) {
    // set values of the form from the selected item
    this.locationsForm.detailsForm.get('address_line1').patchValue(item.address_line1);
    this.locationsForm.detailsForm.get('city').patchValue(item.city);
    this.locationsForm.detailsForm.get('country').patchValue(item.country);
    this.locationsForm.detailsForm.get('postcode').patchValue(item.postcode);
    this.locationsForm.detailsForm.get('latitude').patchValue(item.latitude);
    this.locationsForm.detailsForm.get('longitude').patchValue(item.longitude);
    // move the marker of the map to the current coordinates
    this.moveMarker(item.latitude, item.longitude);
    window.scroll(0, 150);
  }

  /**
   * reverse geocoding to get the address from provided latitude and longitude, using openstreetmap
   * @param lat - longitude of the location
   * @param lng - longitude of the location
   * @returns {Observable}
   */
  private getAddressFromLatLng(lat: number, lng: number): Observable<any> {
    return this.httpService
      .makeRequest('GET', 'https://nominatim.openstreetmap.org/reverse?format=json&lat=' + lat + '&lon=' + lng)
      .pipe(
        map(res => res.data.address)
      );
  }

  /**
   * geocoding to get the coordinates from provided address
   * @param street
   * @param city
   * @param state
   * @param country
   * @param postcode
   * @returns {Observable}
   */
  private getLatLngFromAddress(street?: string, city?: string, country?: string, postcode?: string): Observable<any> {
    const streetParam = street ? '&street=' + street : '';
    const cityParam = city ? '&city=' + city : '';
    const postcodeParam = postcode ? '&postcode=' + postcode : '';
    const countryParam = country ? '&country=' + country : '';
    const params = streetParam + cityParam + countryParam + postcodeParam;
    return this.httpService
      .makeRequest('GET', 'https://nominatim.openstreetmap.org/?format=json' + params)
      .pipe(
        map(res => res.data)
      );
  }

  /**
   * set the form fields when the user clicks on a marker
   * @param clickedMarker - the clicked marker
   */
  protected onMarkerClicked(clickedMarker: any) {
    const clickedLocation = this.crud.rows.find(location => location.uuid === clickedMarker.sourceTarget.options.className);
    this.onLocationClicked(clickedLocation);
  }

  /**
   * handle actions from the table dropdown
   * @param {{actionType: string; item: any}} action
   */
  handleItemActionClicked( action: {actionType: string, item: any}) {
    const {actionType, item} = action;
    if (actionType === 'delete') {
      this.crud.deleteItem(item);
    }
  }
}

