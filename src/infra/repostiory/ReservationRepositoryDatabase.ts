import Reservation from "../../domain/entity/Reservation";
import ReservationRepository from "../../domain/repository/ReservationRepository";
import DatabaseConnection from "../database/DatabaseConnection";

export default class ReservationRepositoryDatabase implements ReservationRepository {
    constructor(readonly connection: DatabaseConnection) {
    }
    
    async get(id: string): Promise<Reservation> {
       const [reservatioData] = await this.connection.query("select * from solid.reservation where reservation_id = $1", [id]);
       if(!reservatioData) throw new Error("Reservation not found")
        return Reservation.restore(reservatioData.reservation_id, reservatioData.room_id, 
                                    reservatioData.email, reservatioData.status, reservatioData.checkin_date, 
                                    reservatioData.checkout_date, parseFloat(reservatioData.price), reservatioData.duration)
    }

    async save(reservation: Reservation): Promise<void> {
        await this.connection.query(`insert into solid.reservation (reservation_id, room_id, email, checkin_date, checkout_date, price, status, duration) 
            values ($1, $2, $3, $4, $5, $6, $7, $8)`, [reservation.id, reservation.roomId, reservation.getEmail(), reservation.getCheckinDate(), reservation.getCheckoutDate(), reservation.getPrice(), reservation.getStatus(), reservation.getDuration()])
    }
}