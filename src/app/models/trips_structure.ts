export interface TripStructure {
    id: number;
    name: String;
    destination: String;
    start_date: String;
    end_date: String;
    price: number;
    availableSeats: number;
    maxSeats: number;
    description: String;
    img: String;
    rate: number;
    rated_count: number;
}