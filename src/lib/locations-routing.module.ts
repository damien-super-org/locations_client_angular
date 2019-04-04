import { Routes } from '@angular/router';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { AuthGuard } from '../../../../midgard/modules/oauth/auth.guard';
import { LocationsComponent } from './locations.component';

const locationsRoutes: Routes = [
  { path: '', component: LocationsComponent, canActivate: [AuthGuard]},
  ];

@NgModule({
  imports: [RouterModule.forChild(locationsRoutes)],
  exports: [RouterModule]
})
export class LocationsRoutingModule {}
