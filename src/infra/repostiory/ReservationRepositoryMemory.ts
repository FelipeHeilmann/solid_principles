import ReservationRepository from "../../domain/repository/ReservationRepository"
import Reservation from "../../domain/entity/Reservation"

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

    async getActiveReservations(roomId: string, checkinDate: Date, checkoutDate: Date): Promise<Reservation[]> {
        return this.reservations.filter(reservation => 
            reservation.roomId === roomId && 
            reservation.getStatus() === 'active' && 
            (
                (checkinDate < reservation.getCheckoutDate() && checkoutDate > reservation.getCheckinDate()) || 
                (reservation.getCheckinDate() < checkoutDate && reservation.getCheckoutDate() > checkinDate)
            )
        )
    }

    async save(reservation: Reservation): Promise<void> {
        this.reservations.push(reservation)
    }

    async update(reservation: Reservation): Promise<void> {
        const index = this.reservations.findIndex(reservation => reservation.id === reservation.id)
        if(index === -1) throw new Error("Reservation not found")
        this.reservations[index] = reservation 
    }

}
