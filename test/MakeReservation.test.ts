import GetReservation from "../src/application/GetReservation"
import MakeReservation from "../src/application/MakeReservation"
import Signup from "../src/application/Signup"
import { PgPromiseAdapter } from "../src/infra/database/DatabaseConnection"
import AccountRepositoryDatabase from "../src/infra/repostiory/AccountRepositoryDatabase"
import ReservationRepositoryDatabase from "../src/infra/repostiory/ReservationRepositoryDatabase"
import { ReservationRepositoryMemory } from "../src/infra/repostiory/ReservationRepositoryMemory"
import RoomRepositoryDatabase from "../src/infra/repostiory/RoomRepositoryDatabase"
import { RoomRepositoryMemory } from "../src/infra/repostiory/RoomRepositoryMemory"

test("Deve fazer a reserva de um quarto com preço por dia", async function() {
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
    const outputMakeReservation = await makeReservation.execute(inputMakeReseration)
    const getReservation = new GetReservation(roomRepository, reservationRepository)
    const outputGetReservation = await getReservation.execute(outputMakeReservation.id)
    expect(outputGetReservation.accountId).toBe(outputSignup.id)
    expect(outputGetReservation.price).toBe(200)
    expect(outputGetReservation.room.category).toBe("suit")
    expect(outputGetReservation.status).toBe("active")
    await databaseConnection.query("delete from solid.reservations where id = $1", [outputMakeReservation.id])
    await databaseConnection.close()
})

test("Deve fazer a reserva de um quarto com preço por hora", async function() {
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
        roomId: "d5f5c6cb-bf69-4743-a288-dafed2517e38",
        checkinDate: "2024-06-10T12:00:00",
        checkoutDate: "2024-06-10T16:00:00"
    }
    const outputMakeReservation = await makeReservation.execute(inputMakeReseration)
    const getReservation = new GetReservation(roomRepository, reservationRepository)
    const outputGetReservation = await getReservation.execute(outputMakeReservation.id)
    expect(outputGetReservation.accountId).toBe(outputSignup.id)
    expect(outputGetReservation.price).toBe(200)
    expect(outputGetReservation.room.category).toBe("regular")
    expect(outputGetReservation.status).toBe("active")
    await databaseConnection.query("delete from solid.reservations where id = $1", [outputMakeReservation.id])   
    await databaseConnection.close()
})

test("Não deve fazer uma reserva com uma reserva na mesma data", async function() {
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
        checkinDate: "2024-06-25T12:00:00",
        checkoutDate: "2024-06-28T12:00:00"
    }
    const outputMakeReservation = await makeReservation.execute(inputMakeReseration)
    const inputMakeReseration2 = {
        accountId: outputSignup.id,
        roomId: "aa354842-59bf-42e6-be3a-6188dbb5fff8",
        checkinDate: "2024-06-25T12:00:00",
        checkoutDate: "2024-06-28T12:00:00"
    }
    expect(() => makeReservation.execute(inputMakeReseration2)).rejects.toThrow(new Error("Room is already reserved for this date"))
    await databaseConnection.query("delete from solid.reservations where id = $1", [outputMakeReservation.id])
    await databaseConnection.close()
})
