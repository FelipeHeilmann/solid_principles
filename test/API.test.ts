import axios from "axios"

test("Deve criar uma conta pela API", async function() {
    const input = {
        email: `john.doe${Math.random()}@gmail.com`,
        name: "John Doe",
        document: "094.365.850-04",
        password:"12345"
    }
    const response = await axios.post("http://localhost:3333/signup", input)
    const output = response.data
    expect(output.id).toBeDefined()
})

test("Deve fazer loign de uma pela api", async function() {
    const inputSignup = {
        email: `john.doe${Math.random()}@gmail.com`,
        name: "John Doe",
        document: "094.365.850-04",
        password:"12345"
    }
    await axios.post("http://localhost:3333/signup", inputSignup) 
    const inputSignin = {
        email: inputSignup.email,
        password: "12345"
    }
    const response = await axios.post("http://localhost:3333/auth", inputSignin)
    const output = response.data
    expect(output.token).toBeDefined() 
})

test("Deve reservar um quarto pela api", async function() {
    const inputSignup = {
        email: `john.doe${Math.random()}@gmail.com`,
        name: "John Doe",
        document: "094.365.850-04",
        password:"12345"
    }
    await axios.post("http://localhost:3333/signup", inputSignup) 
    const inputSignin = {
        email: inputSignup.email,
        password: "12345"
    }
    const responseSignin = await axios.post("http://localhost:3333/auth", inputSignin)
    const outputSignin = responseSignin.data
    const inputMakeReseration = {
        roomId: "d5f5c6cb-bf69-4743-a288-dafed2517e38",
        checkinDate: "2024-06-10T12:00:00",
        checkoutDate: "2024-06-10T16:00:00"
    }
    const responseMakeReservation = await axios.post("http://localhost:3333/reservations", inputMakeReseration, {
        headers: {
            Authorization: `Bearer ${outputSignin.token}`
        }
    })
    const outputMakeReservation = responseMakeReservation.data
    const responseGetReservation = await axios.get(`http://localhost:3333/reservations/${outputMakeReservation.id}`, {
        headers: {
            Authorization: `Bearer ${outputSignin.token}`
        }
    })
    const outputGetReservation = responseGetReservation.data
    expect(outputGetReservation.price).toBe(200)
    expect(outputGetReservation.room.category).toBe("regular")
    expect(outputGetReservation.status).toBe("active")
})