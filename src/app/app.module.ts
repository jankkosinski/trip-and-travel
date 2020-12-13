import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatBadgeModule} from '@angular/material/badge';
import {MatSidenavModule} from '@angular/material/sidenav';

import { AppComponent } from './app.component';
import { TripsComponent } from './components/trips/trips.component';
import { TripsNavbarComponent } from './components/trips-navbar/trips-navbar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TripDetailsComponent } from './components/trip-details/trip-details.component';
import { StarRatesComponent } from './components/star-rates/star-rates.component';
import { CartComponent } from './components/cart/cart.component';


@NgModule({
  declarations: [
    AppComponent,
    TripsComponent,
    TripsNavbarComponent,
    TripDetailsComponent,
    StarRatesComponent,
    CartComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatBadgeModule,
    MatSidenavModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
