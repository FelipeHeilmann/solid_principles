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
    await axios.patch(`http://localhost:3333/reservations/${outputMakeReservation.id}`,{},{
        headers: {
            Authorization: `Bearer ${outputSignin.token}`
        }
    })
})

test("Deve cancelar uma reserva pela api", async function() {
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
    const responseSignup = await axios.post("http://localhost:3333/auth", inputSignin)
    const outputSignup = responseSignup.data
    const inputMakeReseration = {
        roomId: "d5f5c6cb-bf69-4743-a288-dafed2517e38",
        checkinDate: "2024-09-10T12:00:00",
        checkoutDate: "2024-09-10T16:00:00"
    }
    const responseMakeReservation = await axios.post("http://localhost:3333/reservations", inputMakeReseration, {
        headers: {
            Authorization: `Bearer ${outputSignup.token}`
        }
    })
    const outputMakeReservation = responseMakeReservation.data
    await axios.patch(`http://localhost:3333/reservations/${outputMakeReservation.id}`,{},{
        headers: {
            Authorization: `Bearer ${outputSignup.token}`
        }
    })
    const responseGetReservation = await axios.get(`http://localhost:3333/reservations/${outputMakeReservation.id}`, {
        headers: {
            Authorization: `Bearer ${outputSignup.token}`
        }
    })
    const outputGetReservation = responseGetReservation.data
    expect(outputGetReservation.price).toBe(200)
    expect(outputGetReservation.room.category).toBe("regular")
    expect(outputGetReservation.status).toBe("canceled")
})

test("Deve listar as reservas de um usuário", async function() {
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
        accountId: outputSignin.id,
        roomId: "aa354842-59bf-42e6-be3a-6188dbb5fff8",
        checkinDate: "2025-06-06T12:00:00",
        checkoutDate: "2025-06-08T12:00:00"
    }
    const inputMakeReseration2 = {
        accountId: outputSignin.id,
        roomId: "d5f5c6cb-bf69-4743-a288-dafed2517e38",
        checkinDate: "2026-06-10T12:00:00",
        checkoutDate: "2026-06-10T16:00:00"
    }
    const responseMakeReservation1 = await axios.post("http://localhost:3333/reservations", inputMakeReseration, {
        headers: {
            Authorization: `Bearer ${outputSignin.token}`
        }
    })
    const outputMakeReservation1 = responseMakeReservation1.data
    const responseMakeReservation2 = await axios.post("http://localhost:3333/reservations", inputMakeReseration2, {
        headers: {
            Authorization: `Bearer ${outputSignin.token}`
        }
    })
    const outputMakeReservation2 = responseMakeReservation2.data
    const responseListReservations = await axios.get("http://localhost:3333/reservations",{
        headers: {
            Authorization: `Bearer ${outputSignin.token}`
        }
    })
    const outputListReservations = responseListReservations.data
    expect(outputListReservations).toHaveLength(2)
    expect(outputListReservations[0].price).toBe(200)
    expect(outputListReservations[0].room.category).toBe("suit")
    expect(outputListReservations[0].status).toBe("active")
    expect(outputListReservations[0].checkinDate).toEqual(new Date("2025-06-06T12:00:00").toISOString())
    expect(outputListReservations[0].checkoutDate).toEqual(new Date("2025-06-08T12:00:00").toISOString())
    expect(outputListReservations[1].price).toBe(200)
    expect(outputListReservations[1].room.category).toBe("regular")
    expect(outputListReservations[1].status).toBe("active")
    expect(outputListReservations[1].checkinDate).toEqual(new Date("2026-06-10T12:00:00").toISOString())
    expect(outputListReservations[1].checkoutDate).toEqual(new Date("2026-06-10T16:00:00").toISOString())
    await axios.patch(`http://localhost:3333/reservations/${outputMakeReservation1.id}`,{},{
        headers: {
            Authorization: `Bearer ${outputSignin.token}`
        }
    })
    await axios.patch(`http://localhost:3333/reservations/${outputMakeReservation2.id}`,{},{
        headers: {
            Authorization: `Bearer ${outputSignin.token}`
        }
    })
})