import { NgModule } from '@angular/core';
import { LocationsComponent } from './locations.component';
import { MidgardSharedTranslationModule } from '@midgard/modules/translation/translation.shared.module';
import { LocationsRoutingModule } from './locations-routing.module';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { LazyloadingHelper } from '../../../../midgard/helpers/lazyloading.helper';

@NgModule({
  imports: [
    MidgardSharedTranslationModule,
    LocationsRoutingModule,
    LeafletModule.forRoot()
  ],
  providers: [
    LazyloadingHelper
  ],
  declarations: [LocationsComponent],
  exports: [LocationsComponent]
})
export class LocationsModule { }
