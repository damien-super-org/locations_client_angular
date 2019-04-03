import { NgModule } from '@angular/core';
import { ClientComponent } from './blueprint-client.component';
import { MidgardSharedTranslationModule } from '../../../../midgard/modules/translation/translation.shared.module';
import { ClientRoutingModule } from './blueprint-client-routing.module';

@NgModule({
  imports: [
    MidgardSharedTranslationModule,
    ClientRoutingModule,
  ],
  declarations: [ClientComponent],
  exports: [ClientComponent]
})
export class ClientModule { }
