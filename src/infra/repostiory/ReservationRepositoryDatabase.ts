import Reservation from "../../domain/entity/Reservation";
import ReservationRepository from "../../domain/repository/ReservationRepository";
import DatabaseConnection from "../database/DatabaseConnection";

export default class ReservationRepositoryDatabase implements ReservationRepository {
    constructor(readonly connection: DatabaseConnection) {
    }
    
    async get(id: string): Promise<Reservation> {
       const [reservationData] = await this.connection.query("select * from solid.reservations where reservation_id = $1", [id]);
       if(!reservationData) throw new Error("Reservation not found")
        return Reservation.restore(reservationData.reservation_id, reservationData.room_id, 
                                    reservationData.email, reservationData.status, reservationData.checkin_date, 
                                    reservationData.checkout_date, parseFloat(reservationData.price), reservationData.duration)
    }

    async getActiveReservations(roomId: string, checkinDate: Date, checkoutDate: Date): Promise<Reservation[]> {
        const reservationsData = await this.connection.query("select * from solid.reservations where room_id = $1 and (checkin_date, checkout_date) overlaps ($2, $3) and status = 'active'", [roomId, checkinDate, checkoutDate]);
        const reservations: Reservation[] = []
        for(const reservationData of reservationsData) {
            reservations.push(Reservation.restore(reservationData.reservation_id, reservationData.room_id, 
                reservationData.email, reservationData.status, reservationData.checkin_date, 
                reservationData.checkout_date, parseFloat(reservationData.price), reservationData.duration))
        }
        return reservations
    }

    async save(reservation: Reservation): Promise<void> {
        await this.connection.query(`insert into solid.reservations (reservation_id, room_id, email, checkin_date, checkout_date, price, status, duration) 
            values ($1, $2, $3, $4, $5, $6, $7, $8)`, [reservation.id, reservation.roomId, reservation.getEmail(), reservation.getCheckinDate(), reservation.getCheckoutDate(), reservation.getPrice(), reservation.getStatus(), reservation.getDuration()])
    }

    async update(reservation: Reservation): Promise<void> {
        await this.connection.query("update solid.reservations set status = $1 where reservation_id = $2", [reservation.getStatus(), reservation.id])
    }
}