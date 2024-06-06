import ReservationRepository from "./ReservationRepository";
import RoomRepository from "./RoomRepository";

export default class GetReservation {
    constructor(readonly roomRepository: RoomRepository, readonly reservationRepository: ReservationRepository) {
    }

    async execute(reservationId: string): Promise<Output> {
        const reservation = await this.reservationRepository.get(reservationId)
        const room = await this.roomRepository.get(reservation.roomId)
        return {
            id: reservation.id,
            price: reservation.getPrice(),
            email: reservation.getEmail(),
            room: {
                id: room.id,
                category: room.category,
                type: room.type
            },
            checkinDate: reservation.getCheckinDate(),
            checkoutDate: reservation.getCheckoutDate(),
            duration: reservation.getDuration(),
            status: reservation.getStatus()
        }
    }
}

type Output = {
    id: string,
    price: number,
    email: string,
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