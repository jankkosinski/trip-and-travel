import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {FilterStructure} from "../../models/filter_structure"

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent implements OnInit {

  @Input() minPrice: number;
  @Input() maxPrice: number;
  @Output() filterEvent = new EventEmitter();
  @Output() closeFilters = new EventEmitter();

  useFilerPrice: boolean = false;
  minFilterPrice: number;
  maxFilterPrice: number;

  useFilterDate: boolean = false;
  startFilterDate: string;
  endFilterDate: string;

  useFilterRate: boolean = false;
  starFilter_1: boolean;
  starFilter_2: boolean;
  starFilter_3: boolean;
  starFilter_4: boolean;
  starFilter_5: boolean;

  constructor() { }

  ngOnInit(): void {
  }

  useFilters(): void {
    let filterData: FilterStructure = {
      useFilerPrice: this.useFilerPrice,
      minFilterPrice: this.minFilterPrice,
      maxFilterPrice: this.maxFilterPrice,
      useFilterDate: this.useFilterDate,
      startFilterDate: this.startFilterDate,
      endFilterDate: this.endFilterDate,
      useFilterRate: this.useFilterRate,
      starFilter_1: this.starFilter_1,
      starFilter_2: this.starFilter_2,
      starFilter_3: this.starFilter_3,
      starFilter_4: this.starFilter_4,
      starFilter_5: this.starFilter_5
    }
    this.filterEvent.emit(filterData);
  }

  clear(): void {
    this.useFilerPrice = false;
    this.minFilterPrice = this.minPrice;
    this.maxFilterPrice = this.maxPrice;

    this.useFilterDate = false;
    this.startFilterDate = "";
    this.endFilterDate = "";

    this.useFilterRate = false;
    this.starFilter_1 = false;
    this.starFilter_2 = false;
    this.starFilter_3 = false;
    this.starFilter_4 = false;
    this.starFilter_5 = false;
    this.useFilters();
  }

  close(): void {
    this.closeFilters.emit();
  }

}
