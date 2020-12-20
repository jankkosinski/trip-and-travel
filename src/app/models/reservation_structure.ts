export interface Reservation {
    id: string,
    trip_id: string,
    reservations_count: number
}

export interface Basket {
    id: string,
    user_id: string,
    reservation_list: Array<string>
}