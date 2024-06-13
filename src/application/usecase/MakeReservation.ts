import Reservation from "../../domain/entity/Reservation"
import ReservationRepository from "../../domain/repository/ReservationRepository"
import RoomRepository from "../../domain/repository/RoomRepository"
import { RoomAlreadyReserved } from "../exceptions/ApplicationExceptions"

export default class MakeReservation {
    constructor(readonly roomRepository: RoomRepository, readonly reservationRepository: ReservationRepository) {
    }

    async execute(input: Input): Promise<Output> {
        const room = await this.roomRepository.get(input.roomId)
        const [activeReservation] = await this.reservationRepository.getActiveReservations(input.roomId, new Date(input.checkinDate), new Date(input.checkoutDate))
        if(activeReservation) throw new RoomAlreadyReserved()
        const reservation = Reservation.create(input.roomId, input.accountId, input.checkinDate, input.checkoutDate)
        reservation.calculate(room)
        await this.reservationRepository.save(reservation)
        return {
            id: reservation.id
        }
    }
}

type Input = {
    accountId: string, 
    checkinDate: string,
    checkoutDate: string, 
    roomId: string
}

type Output = {
    id: string
}