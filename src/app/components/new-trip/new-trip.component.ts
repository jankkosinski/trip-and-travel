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

  private maxImgBytes: number = 1048487;

  name: string = "";
  destination: string = "";
  start_date: string = "";
  end_date: string = "";
  price: number = null;
  seats: number = null;
  description: string = "";
  img: string = "";

  panelOpenState: boolean = false;
  fileStatus: string = "";

  constructor(private tripDataService: TripsDataService, private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
  }

  onSelectFile(event) {
    const reader = new FileReader();
    if(event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      reader.readAsDataURL(file);
      reader.onload = () => {
        let imgValue = reader.result as string;
        this.myInputFileVariable.nativeElement.value = "";
        const byteSize = new Blob([imgValue]).size;
        if (byteSize > this.maxImgBytes) {
          this.img = null;
          this.fileStatus = "File upload has failed! The file can't be larger than 1MB."
        } else {
          this.img = imgValue; 
          this.fileStatus = "File transfer was successful!"
        }
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
        id: "newTrip",
        name: this.name,
        destination: this.destination,
        start_date: this.start_date,
        end_date: this.end_date,
        price: this.price,
        availableSeats: this.seats,
        maxSeats: this.seats,
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
    if (this.seats == null) available = false;
    if (this.description == "") available = false;
    if (this.img == "") available = false;

    return available;
  }

  checkValue() {
    if (this.price < 0) {
      this.price = 0;
    }
    if (this.seats < 0) {
      this.seats = 0;
    }
  }

  clearData(): void {
    this.name = "";
    this.destination = "";
    this.start_date = "";
    this.end_date = "";
    this.price = null;
    this.seats = null;
    this.description = "";
    this.img = "";
    this.myInputFileVariable.nativeElement.value = "";
    this.fileStatus = "";
  }
}
