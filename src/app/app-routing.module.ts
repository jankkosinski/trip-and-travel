import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {StartPanelComponent} from "./components/start-panel/start-panel.component"
import {TripsComponent} from "./components/trips/trips.component"
import {TripPageComponent} from "./components/trip-page/trip-page.component"
import {PageNotFoundComponent} from "./components/page-not-found/page-not-found.component"

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full'},
  { path: 'login', component: StartPanelComponent },
  { path: 'trips',  component: TripsComponent},
  { path: 'trip-page', component: TripPageComponent},
  { path: '**', component: PageNotFoundComponent}
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
