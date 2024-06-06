import Reservation from "../domain/entity/Reservation"
import ReservationRepository from "../domain/repository/ReservationRepository"
import RoomRepository from "../domain/repository/RoomRepository"

export default class MakeReservation {
    constructor(readonly roomRepository: RoomRepository, readonly reservationRepository: ReservationRepository) {
    }

    async execute(input: Input): Promise<Output> {
        const room = await this.roomRepository.get(input.roomId)
        const reservation = Reservation.create(input.roomId, input.email, input.checkinDate, input.checkoutDate)
        reservation.calculate(room)
        await this.reservationRepository.save(reservation)
        return {
            id: reservation.id
        }
    }
}

type Input = {
    email: string, 
    checkinDate: string,
    checkoutDate: string, 
    roomId: string
}

type Output = {
    id: string
}