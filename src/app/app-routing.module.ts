import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {StartPanelComponent} from "./components/start-panel/start-panel.component"
import {TripsComponent} from "./components/trips/trips.component"
import {TripPageComponent} from "./components/trip-page/trip-page.component"

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full'},
  { path: 'login', component: StartPanelComponent },
  { path: 'trips',  component: TripsComponent},
  { path: 'trip-page', component: TripPageComponent}
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
