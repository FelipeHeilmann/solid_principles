import Signup from "../../src/application/usecase/Signup"
import { PgPromiseAdapter } from "../../src/infra/database/DatabaseConnection"
import AccountRepositoryDatabase from "../../src/infra/repostiory/AccountRepositoryDatabase"

test("Deve criar uma conta de usuário", async function() {
    const databaseConnection = new PgPromiseAdapter()
    const accounRepository = new AccountRepositoryDatabase(databaseConnection)
    const signup = new Signup(accounRepository)
    const input = {
        email: `john.doe${Math.random()}@gmail.com`,
        name: "John Doe",
        document: "094.365.850-04",
        password:"12345"
    }
    const output = await signup.execute(input)
    expect(output.id).toBeDefined()
    await databaseConnection.close()
})

test("Não deve criar uma conta de usuário com email já em uso", async function() {
    const databaseConnection = new PgPromiseAdapter()
    const accounRepository = new AccountRepositoryDatabase(databaseConnection)
    const signup = new Signup(accounRepository)
    const email =  `john.doe${Math.random()}@gmail.com`
    const input = {
        email,
        name: "John Doe",
        document: "094.365.850-04",
        password:"12345"
    }
    const input2 = {
        email,
        name: "John Doe",
        document: "016.455.080-13",
        password:"123456789"
    }
    await signup.execute(input)
    expect(() => signup.execute(input2)).rejects.toThrow(new Error("Email already in use"))
    await databaseConnection.close()
})