// entry component for the client
import {Component, OnInit} from '@angular/core';
import { Store } from '../../../../midgard/modules/store/store';
@Component({
  selector: 'lib-client',
  templateUrl: './blueprint-client.component.html',
  styleUrls: ['./blueprint-client.component.scss']
})
export class ClientComponent implements OnInit {
  constructor(private store: Store<any>) {}
  ngOnInit() {}
}

