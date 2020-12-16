import { Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import { TripStructure } from '../../models/trips_structure';
import { TripsDataService } from '../../services/trips-data.service';
import {MatSnackBar} from '@angular/material/snack-bar';


@Component({
  selector: 'app-new-trip',
  templateUrl: './new-trip.component.html',
  styleUrls: ['./new-trip.component.css']
})
export class NewTripComponent implements OnInit {

  @ViewChild('uploadFile') myInputFileVariable: ElementRef;

  name: String = "";
  destination: String = "";
  start_date: String = "";
  end_date: String = "";
  price: number = null;
  availableSeats: number = null;
  maxSeats: number = null;
  description: String = "";
  img: string = "";

  panelOpenState: boolean = false;
  fileStatus: String = "";

  constructor(private tripDataService: TripsDataService, private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
  }

  onSelectFile(event) {
    const reader = new FileReader();
    if(event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.img = reader.result as string;
        this.fileStatus = "File uploaded successfully!"
      };
    }
  }

  saveNewTrip(): void {
    if (this.validateData() == false) {
      this._snackBar.open('Please fill all trip details.', 'Close',{
        duration: 3000,
      });
    } else {
      let trip: TripStructure = {
        id: 0,
        name: this.name,
        destination: this.destination,
        start_date: this.start_date,
        end_date: this.end_date,
        price: this.price,
        availableSeats: this.availableSeats,
        maxSeats: this.maxSeats,
        description: this.description,
        img: this.img,
        rate: 0,
        rated_count: 0
      }
      this.tripDataService.addProduct(trip);
      this.clearData();
      this.panelOpenState = false;
    }
  }

  validateData(): boolean {

    let available = true;
    if (this.name == "") available = false;
    if (this.destination == "") available = false;
    if (this.start_date == "") available = false;
    if (this.end_date == "") available = false;
    if (this.price == null) available = false;
    if (this.availableSeats == null) available = false;
    if (this.maxSeats == null) available = false;
    if (this.description == "") available = false;
    if (this.img == "") available = false;

    return available;
  }

  clearData(): void {
    this.name = "";
    this.destination = "";
    this.start_date = "";
    this.end_date = "";
    this.price = null;
    this.availableSeats = null;
    this.maxSeats = null;
    this.description = "";
    this.img = "";
    this.myInputFileVariable.nativeElement.value = "";
    this.fileStatus = "";
  }
}
