import CancelReservation from "../../src/application/usecase/CancelReservation"
import GetReservationQuery from "../../src/application/query/GetReservationQuery"
import MakeReservation from "../../src/application/usecase/MakeReservation"
import Signup from "../../src/application/usecase/Signup"
import { PgPromiseAdapter } from "../../src/infra/database/DatabaseConnection"
import AccountRepositoryDatabase from "../../src/infra/repostiory/AccountRepositoryDatabase"
import ReservationRepositoryDatabase from "../../src/infra/repostiory/ReservationRepositoryDatabase"
import RoomRepositoryDatabase from "../../src/infra/repostiory/RoomRepositoryDatabase"

test("Deve cancelar uma reserva", async function() {
    const databaseConnection = new PgPromiseAdapter()
    const roomRepository = new RoomRepositoryDatabase(databaseConnection)
    const reservationRepository = new ReservationRepositoryDatabase(databaseConnection)
    const accounRepository = new AccountRepositoryDatabase(databaseConnection)
    const signup = new Signup(accounRepository)
    const inputSignup = {
        email: `john.doe${Math.random()}@gmail.com`,
        name: "John Doe",
        document: "094.365.850-04",
        password:"12345"
    }
    const outputSignup = await signup.execute(inputSignup)
    const makeReservation = new MakeReservation(roomRepository, reservationRepository)
    const inputMakeReseration = {
        accountId: outputSignup.id,
        roomId: "aa354842-59bf-42e6-be3a-6188dbb5fff8",
        checkinDate: "2024-06-06T12:00:00",
        checkoutDate: "2024-06-08T12:00:00"
    }
    const outputMakeReservation = await makeReservation.execute(inputMakeReseration)
    const cancelReservation= await new CancelReservation(reservationRepository)
    await cancelReservation.execute(outputMakeReservation.id)
    const getReservation = new GetReservationQuery(databaseConnection)
    const outputGetReservation = await getReservation.execute(outputMakeReservation.id)
    expect(outputGetReservation.accountId).toBe(outputSignup.id)
    expect(outputGetReservation.price).toBe(200)
    expect(outputGetReservation.room.category).toBe("suit")
    expect(outputGetReservation.status).toBe("canceled")
    await databaseConnection.close()
})