import { NgModule } from '@angular/core';
import { LocationsComponent } from './locations.component';
import { MidgardSharedTranslationModule } from '@midgard/modules/translation/translation.shared.module';
import { LocationsRoutingModule } from './locations-routing.module';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { MidgardFormModule } from '../../../../midgard/modules/form/form.module';
import { MidgardCrudModule } from '../../../../midgard/modules/crud/crud.module';
import { MidgardHttpModule } from '../../../../midgard/modules/http/http.module';

@NgModule({
  imports: [
    MidgardSharedTranslationModule,
    MidgardFormModule,
    MidgardCrudModule,
    MidgardHttpModule,
    LocationsRoutingModule,
    LeafletModule.forRoot()
  ],
  declarations: [LocationsComponent],
  exports: [LocationsComponent]
})
export class LocationsModule { }
