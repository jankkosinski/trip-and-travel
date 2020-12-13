import {TripStructure} from "./trips_structure"

export interface Reservation {
    trip: TripStructure;
    reservations_count: number;
}