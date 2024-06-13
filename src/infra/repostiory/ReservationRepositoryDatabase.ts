import Reservation from "../../domain/entity/Reservation";
import ReservationRepository from "../../domain/repository/ReservationRepository";
import DatabaseConnection from "../database/DatabaseConnection";
import { NotFound } from "../exceptions/InfraExceptions";

export default class ReservationRepositoryDatabase implements ReservationRepository {
    constructor(readonly connection: DatabaseConnection) {
    }
    
    async get(id: string): Promise<Reservation> {
       const [reservationData] = await this.connection.query("select * from solid.reservations where id = $1", [id]);
       if(!reservationData) throw new NotFound("Reservation")
        return Reservation.restore(reservationData.id, reservationData.room_id, 
                                    reservationData.account_id, reservationData.status, reservationData.checkin_date, 
                                    reservationData.checkout_date, parseFloat(reservationData.price), reservationData.duration)
    }

    async getActiveReservations(roomId: string, checkinDate: Date, checkoutDate: Date): Promise<Reservation[]> {
        const reservationsData = await this.connection.query("select * from solid.reservations where room_id = $1 and (checkin_date, checkout_date) overlaps ($2, $3) and status = 'active'", [roomId, checkinDate, checkoutDate]);
        const reservations: Reservation[] = []
        for(const reservationData of reservationsData) {
            reservations.push(Reservation.restore(reservationData.id, reservationData.room_id, 
                reservationData.account_id, reservationData.status, reservationData.checkin_date, 
                reservationData.checkout_date, parseFloat(reservationData.price), reservationData.duration))
        }
        return reservations
    }

    async save(reservation: Reservation): Promise<void> {
        await this.connection.query(`insert into solid.reservations (id, room_id, account_id, checkin_date, checkout_date, price, status, duration) 
            values ($1, $2, $3, $4, $5, $6, $7, $8)`, [reservation.id, reservation.roomId, reservation.accountId, reservation.getCheckinDate(), reservation.getCheckoutDate(), reservation.getPrice(), reservation.getStatus(), reservation.getDuration()])
    }

    async update(reservation: Reservation): Promise<void> {
        await this.connection.query("update solid.reservations set status = $1 where id = $2", [reservation.getStatus(), reservation.id])
    }
}