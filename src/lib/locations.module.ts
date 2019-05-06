import { NgModule } from '@angular/core';
import { LocationsComponent } from './locations.component';
import { LocationsRoutingModule } from './locations-routing.module';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { MidgardFormModule } from '../../../../midgard/modules/form/form.module';
import { MidgardCrudModule } from '../../../../midgard/modules/crud/crud.module';
import { MidgardHttpModule } from '../../../../midgard/modules/http/http.module';
import { FjButtonModule } from 'freyja-ui';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [
    CommonModule,
    MidgardFormModule,
    MidgardCrudModule,
    MidgardHttpModule,
    FjButtonModule,
    LocationsRoutingModule,
    LeafletModule.forRoot(),
  ],
  declarations: [LocationsComponent],
  exports: [LocationsComponent]
})
export class LocationsModule { }
