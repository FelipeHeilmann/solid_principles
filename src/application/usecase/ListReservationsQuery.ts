import DatabaseConnection from "../../infra/database/DatabaseConnection";

export default class ListReservationsQuery {
    constructor(readonly connection: DatabaseConnection) {
    }

    async execute(accountId: string): Promise<Output[]> {
        const reservationsData = await this.connection.query("select rs.*, rm.id as room_id, rm.category as room_category, rm.type as room_type from solid.reservations rs join solid.rooms rm on rs.room_id = rm.id where rs.account_id = $1", [accountId])
        const output: Output[] = []
        for(const reservationData of reservationsData) {
            output.push({
                id: reservationData.id,
                price: parseFloat(reservationData.price),
                accountId: reservationData.account_id,
                room: {
                    id: reservationData.room_id,
                    category: reservationData.room_category,
                    type: reservationData.room_type
                },
                checkinDate: reservationData.checkin_date,
                checkoutDate: reservationData.checkout_date,
                duration: reservationData.duration,
                status: reservationData.status
            })
        }
        return output
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