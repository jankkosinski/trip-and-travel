export interface TripStructure {
    id: number;
    name: string;
    destination: string;
    start_date: string;
    end_date: string;
    price: number;
    availableSeats: number;
    maxSeats: number;
    description: string;
    img: string;
    rate: number;
    rated_count: number;
}