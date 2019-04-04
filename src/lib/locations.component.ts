// entry component for the client
import {Component, OnInit} from '@angular/core';
import { Store } from '../../../../midgard/modules/store/store';
import { latLng, tileLayer } from 'leaflet';
@Component({
  selector: 'lib-locations',
  templateUrl: './locations.component.html',
  styleUrls: ['./locations.component.scss']
})
export class LocationsComponent implements OnInit {
  private options = {
    layers: [
      tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 18, attribution: '...' })
    ],
    zoom: 5,
    center: latLng(46.879966, -121.726909)
  };
  constructor(
    private store: Store<any>,
  ) {}
  ngOnInit() {
  }
}

