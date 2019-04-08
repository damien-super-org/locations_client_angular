// entry component for the client
import { Component, OnInit, ViewChild } from '@angular/core';
import { Store } from '../../../../midgard/modules/store/store';
import { icon, latLng, marker, tileLayer } from 'leaflet';
import { FormComponent } from '../../../../midgard/modules/form/form.component';
@Component({
  selector: 'lib-locations',
  templateUrl: './locations.component.html',
  styleUrls: ['./locations.component.scss']
})
export class LocationsComponent implements OnInit {
  @ViewChild('locationsForm') locationsForm: FormComponent;
  protected formFields;
  private marker = marker([ 52.5200, 13.4050 ], {
    icon: icon({
      iconSize: [ 25, 41 ],
      iconAnchor: [ 13, 41 ],
      iconUrl: 'assets/leaflet/marker-icon.png',
      shadowUrl: 'assets/leaflet/marker-shadow.png'
    }), draggable: true});
  private options = {
    layers: [
      this.marker,
      tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 18, attribution: '...' }),
    ],
    zoom: 3,
    center: latLng(52.5200, 13.4050)
  };
  constructor(
    private store: Store<any>,
  ) {}
  ngOnInit() {
    this.defineFormFields();
    this.onMarkerPositionChanged();
  }

  /**
   * defines form fields of the detail view
   */
  defineFormFields() {
    this.formFields = [
      {label: 'Lat.', controlName: 'latitude', type: 'text'},
      {label: 'Lng.', controlName: 'longitude', type: 'text'},
    ];
  }

  /**
   * this function is triggered when the marker position is changed its purpose is to insert the lang long to the form
   */
  private onMarkerPositionChanged() {
    this.marker.on('moveend', (evt) => {
      console.log(evt.target);
      this.locationsForm.detailsForm.get('latitude').patchValue(evt.target._latlng.lat);
      this.locationsForm.detailsForm.get('longitude').patchValue(evt.target._latlng.lng);
    });
  }
}

