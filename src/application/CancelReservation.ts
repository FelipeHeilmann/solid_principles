import ReservationRepository from "../domain/repository/ReservationRepository";

export default class CancelReservation {
    constructor(readonly reservationRepository: ReservationRepository) {
    }

    async execute(reservationId: string): Promise<void> {
        const reservation = await this.reservationRepository.get(reservationId)
        reservation.cencel()
        await this.reservationRepository.update(reservation)
    }
}