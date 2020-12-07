import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';

import { AppComponent } from './app.component';
import { TripsComponent } from './trips/trips.component';
import { TripsNavbarComponent } from './trips-navbar/trips-navbar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TripDetailsComponent } from './trip-details/trip-details.component';
import { StarRatesComponent } from './star-rates/star-rates.component';


@NgModule({
  declarations: [
    AppComponent,
    TripsComponent,
    TripsNavbarComponent,
    TripDetailsComponent,
    StarRatesComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
