import { Routes } from '@angular/router';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { AuthGuard } from '../../../../midgard/modules/oauth/auth.guard';
import { ClientComponent} from './blueprint-client.component';

const clientRoutes: Routes = [
  { path: '', component: ClientComponent, canActivate: [AuthGuard]},
  ];

@NgModule({
  imports: [RouterModule.forChild(clientRoutes)],
  exports: [RouterModule]
})
export class ClientRoutingModule {}
