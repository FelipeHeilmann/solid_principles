import Signup from "../src/application/Signup"
import { PgPromiseAdapter } from "../src/infra/database/DatabaseConnection"
import AccountRepositoryDatabase from "../src/infra/repostiory/AccountRepositoryDatabase"

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