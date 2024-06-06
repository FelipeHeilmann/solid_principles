import Reservation from "./Reservation"

export default interface ReservationRepository {
    get(id: string): Promise<Reservation>
    save(reservation: Reservation): Promise<void>
}

export class ReservationRepositoryMemory implements ReservationRepository {
    private reservations: Reservation[]
    
    constructor() {
        this.reservations = []
    }
    
    async get(id: string): Promise<Reservation> {
        const reservation = this.reservations.find(reservation => reservation.id === id)
        if(!reservation) throw new Error("Reservation not found")
        return reservation
    }

    async save(reservation: Reservation): Promise<void> {
        this.reservations.push(reservation)
    }

}

