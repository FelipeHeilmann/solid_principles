import CancelReservation from "../src/application/CancelReservation"
import GetReservation from "../src/application/GetReservation"
import MakeReservation from "../src/application/MakeReservation"
import { PgPromiseAdapter } from "../src/infra/database/DatabaseConnection"
import ReservationRepositoryDatabase from "../src/infra/repostiory/ReservationRepositoryDatabase"
import RoomRepositoryDatabase from "../src/infra/repostiory/RoomRepositoryDatabase"

test("Deve cancelar uma reserva", async function() {
    const databaseConnection = new PgPromiseAdapter()
    const roomRepository = new RoomRepositoryDatabase(databaseConnection)
    const reservationRepository = new ReservationRepositoryDatabase(databaseConnection)
    const makeReservation = new MakeReservation(roomRepository, reservationRepository)
    const inputMakeReseration = {
        email: "joe.doe@gmail.com",
        roomId: "aa354842-59bf-42e6-be3a-6188dbb5fff8",
        checkinDate: "2024-06-06T12:00:00",
        checkoutDate: "2024-06-08T12:00:00"
    }
    const outputMakeReservation = await makeReservation.execute(inputMakeReseration)
    const cancelReservation= await new CancelReservation(reservationRepository)
    await cancelReservation.execute(outputMakeReservation.id)
    const getReservation = new GetReservation(roomRepository, reservationRepository)
    const outputGetReservation = await getReservation.execute(outputMakeReservation.id)
    expect(outputGetReservation.email).toBe(inputMakeReseration.email)
    expect(outputGetReservation.price).toBe(200)
    expect(outputGetReservation.room.category).toBe("suit")
    expect(outputGetReservation.status).toBe("canceled")
    await databaseConnection.close()
})