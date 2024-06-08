import Reservation from "../entity/Reservation"

export default interface ReservationRepository {
    get(id: string): Promise<Reservation>
    getActiveReservations(roomId: string, checkinDate: Date, checkoutDate: Date): Promise<Reservation[]>
    save(reservation: Reservation): Promise<void>
    update(reservation: Reservation): Promise<void>
}


