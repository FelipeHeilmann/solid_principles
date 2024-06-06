import Reservation from "../entity/Reservation"

export default interface ReservationRepository {
    get(id: string): Promise<Reservation>
    save(reservation: Reservation): Promise<void>
}


