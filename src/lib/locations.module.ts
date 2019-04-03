import { NgModule } from '@angular/core';
import { ClientComponent } from './locations.component';
import { MidgardSharedTranslationModule } from '../../../../midgard/modules/translation/translation.shared.module';
import { ClientRoutingModule } from './locations-routing.module';

@NgModule({
  imports: [
    MidgardSharedTranslationModule,
    ClientRoutingModule,
  ],
  declarations: [ClientComponent],
  exports: [ClientComponent]
})
export class ClientModule { }
