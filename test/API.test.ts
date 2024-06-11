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