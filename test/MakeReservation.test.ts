import GetReservation from "../src/GetReservation"
import MakeReservation from "../src/MakeReservation"
import { ReservationRepositoryMemory } from "../src/ReservationRepository"
import { RoomRepositoryMemory } from "../src/RoomRepository"

test("Deve fazer a reserva de um quarto com preço por dia", async function() {
    const roomRepository = new RoomRepositoryMemory()
    const reservationRepository = new ReservationRepositoryMemory()
    const makeReservation = new MakeReservation(roomRepository, reservationRepository)
    const inputMakeReseration = {
        email: "joe.doe@gmail.com",
        roomId: "aa354842-59bf-42e6-be3a-6188dbb5fff8",
        checkinDate: "2024-06-06T12:00:00",
        checkoutDate: "2024-06-08T12:00:00"
    }
    const outputMakeReservation = await makeReservation.execute(inputMakeReseration)
    const getReservation = new GetReservation(roomRepository, reservationRepository)
    const outputGetReservation = await getReservation.execute(outputMakeReservation.id)
    expect(outputGetReservation.email).toBe(inputMakeReseration.email)
    expect(outputGetReservation.price).toBe(200)
    expect(outputGetReservation.room.category).toBe("suit")
    expect(outputGetReservation.status).toBe("active")
})
