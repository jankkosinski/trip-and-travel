import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatBadgeModule} from '@angular/material/badge';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatInputModule} from '@angular/material/input';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatSliderModule} from '@angular/material/slider';
import {MatTabsModule} from '@angular/material/tabs';
import {MatCardModule} from '@angular/material/card';

import { AppComponent } from './app.component';
import { TripsComponent } from './components/trips/trips.component';
import { TripsNavbarComponent } from './components/trips-navbar/trips-navbar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TripDetailsComponent } from './components/trip-details/trip-details.component';
import { StarRatesComponent } from './components/star-rates/star-rates.component';
import { CartComponent } from './components/cart/cart.component';
import { NewTripComponent } from './components/new-trip/new-trip.component';
import { FilterComponent } from './components/filter/filter.component';
import { StartPanelComponent } from './components/start-panel/start-panel.component';
import { TripPageComponent } from './components/trip-page/trip-page.component';



@NgModule({
  declarations: [
    AppComponent,
    TripsComponent,
    TripsNavbarComponent,
    TripDetailsComponent,
    StarRatesComponent,
    CartComponent,
    NewTripComponent,
    FilterComponent,
    StartPanelComponent,
    TripPageComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatBadgeModule,
    MatSidenavModule,
    MatSnackBarModule,
    MatInputModule,
    MatExpansionModule,
    MatCheckboxModule,
    MatSliderModule,
    MatTabsModule,
    MatCardModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
