import ListReservationsQuery from "../src/application/usecase/ListReservationsQuery"
import MakeReservation from "../src/application/usecase/MakeReservation"
import Signup from "../src/application/usecase/Signup"
import { PgPromiseAdapter } from "../src/infra/database/DatabaseConnection"
import AccountRepositoryDatabase from "../src/infra/repostiory/AccountRepositoryDatabase"
import ReservationRepositoryDatabase from "../src/infra/repostiory/ReservationRepositoryDatabase"
import RoomRepositoryDatabase from "../src/infra/repostiory/RoomRepositoryDatabase"

test("Deve listar as reservas de um usuário", async function() {
    const databaseConnection = new PgPromiseAdapter()
    const roomRepository = new RoomRepositoryDatabase(databaseConnection)
    const reservationRepository = new ReservationRepositoryDatabase(databaseConnection)
    const makeReservation = new MakeReservation(roomRepository, reservationRepository)
    const accounRepository = new AccountRepositoryDatabase(databaseConnection)
    const signup = new Signup(accounRepository)
    const inputSignup = {
        email: `john.doe${Math.random()}@gmail.com`,
        name: "John Doe",
        document: "094.365.850-04",
        password:"12345"
    }
    const outputSignup = await signup.execute(inputSignup)
    const inputMakeReseration = {
        accountId: outputSignup.id,
        roomId: "aa354842-59bf-42e6-be3a-6188dbb5fff8",
        checkinDate: "2024-06-06T12:00:00",
        checkoutDate: "2024-06-08T12:00:00"
    }
    const inputMakeReseration2 = {
        accountId: outputSignup.id,
        roomId: "d5f5c6cb-bf69-4743-a288-dafed2517e38",
        checkinDate: "2025-06-10T12:00:00",
        checkoutDate: "2025-06-10T16:00:00"
    }
    const outputMakeReservation1 = await makeReservation.execute(inputMakeReseration) 
    const outputMakeReservation2 = await makeReservation.execute(inputMakeReseration2)
    const listReservations = new ListReservationsQuery(databaseConnection)
    const outputListReservations = await listReservations.execute(outputSignup.id)
    expect(outputListReservations).toHaveLength(2)
    expect(outputListReservations[0].accountId).toBe(outputSignup.id)
    expect(outputListReservations[0].price).toBe(200)
    expect(outputListReservations[0].room.category).toBe("suit")
    expect(outputListReservations[0].status).toBe("active")
    expect(outputListReservations[0].checkinDate).toEqual(new Date("2024-06-06T12:00:00"))
    expect(outputListReservations[0].checkoutDate).toEqual(new Date("2024-06-08T12:00:00"))
    expect(outputListReservations[1].price).toBe(200)
    expect(outputListReservations[1].room.category).toBe("regular")
    expect(outputListReservations[1].status).toBe("active")
    expect(outputListReservations[1].checkinDate).toEqual(new Date("2025-06-10T12:00:00"))
    expect(outputListReservations[1].checkoutDate).toEqual(new Date("2025-06-10T16:00:00"))
    await databaseConnection.query("delete from solid.reservations where id = $1", [outputMakeReservation1.id])   
    await databaseConnection.query("delete from solid.reservations where id = $1", [outputMakeReservation2.id])   
    await databaseConnection.close()
})