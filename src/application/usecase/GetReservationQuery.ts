import DatabaseConnection from "../../infra/database/DatabaseConnection";

export default class GetReservationQuery {
    constructor(readonly connection: DatabaseConnection) {
    }

    async execute(reservationId: string): Promise<Output> {
        const [reservation] = await this.connection.query("select rs.*, rm.id as room_id, rm.category as room_category, rm.type as room_type from solid.reservations rs join solid.rooms rm on rs.room_id = rm.id where rs.id = $1", [reservationId])
        return {
            id: reservation.id,
            price: parseFloat(reservation.price),
            accountId: reservation.account_id,
            room: {
                id: reservation.room_id,
                category: reservation.room_category,
                type: reservation.room_type
            },
            checkinDate: reservation.checkin_date,
            checkoutDate: reservation.checkout_date,
            duration: reservation.duration,
            status: reservation.status
        }
    }
}

type Output = {
    id: string,
    price: number,
    accountId: string,
    duration: number,
    status: string,
    checkinDate: Date,
    checkoutDate: Date,
    room: {
        id: string,
        type: string,
        category: string
    }
}