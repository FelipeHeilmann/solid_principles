import 'dotenv/config'
import Signin from "../src/application/usecase/Signin"
import Signup from "../src/application/usecase/Signup"
import { PgPromiseAdapter } from "../src/infra/database/DatabaseConnection"
import AccountRepositoryDatabase from "../src/infra/repostiory/AccountRepositoryDatabase"
import JwtTokenAdapter from "../src/infra/service/JwtTokenAdapter"

test("Deve fazer o login de um usuário", async function() {
    const databaseConnection = new PgPromiseAdapter()
    const accountRepository = new AccountRepositoryDatabase(databaseConnection)
    const email = `john.doe${Math.random()}@gmail.com`
    const inputSignup = {
        email,
        name: "John Doe",
        document: "094.365.850-04",
        password:"12345"
    }
    const signup = new Signup(accountRepository)
    await signup.execute(inputSignup)
    const inputSignin = {
        email,
        password: "12345"
    }
    const tokenService = new JwtTokenAdapter()
    const signin = new Signin(accountRepository, tokenService)
    const outputSignin = await signin.execute(inputSignin)
    expect(outputSignin.token).toBeDefined()
    await databaseConnection.close()
})

test("Não deve fazer login para usuário com email inválido", async function() {
    const databaseConnection = new PgPromiseAdapter()
    const accountRepository = new AccountRepositoryDatabase(databaseConnection)
    const inputSignup = {
        email: `john.doe${Math.random()}@gmail.com`,
        name: "John Doe",
        document: "094.365.850-04",
        password:"12345"
    }
    const signup = new Signup(accountRepository)
    await signup.execute(inputSignup)
    const inputSignin = {
        email: "john.doe@gmail.com",
        password: "12345"
    }
    const tokenService = new JwtTokenAdapter()
    const signin = new Signin(accountRepository, tokenService)
    expect(() => signin.execute(inputSignin)).rejects.toThrow(new Error("Invalid credentials"))
    await databaseConnection.close()
})

test("Não deve fazer o login de um usuário com senha inválida", async function() {
    const databaseConnection = new PgPromiseAdapter()
    const accountRepository = new AccountRepositoryDatabase(databaseConnection)
    const email = `john.doe${Math.random()}@gmail.com`
    const inputSignup = {
        email,
        name: "John Doe",
        document: "094.365.850-04",
        password:"12345"
    }
    const signup = new Signup(accountRepository)
    await signup.execute(inputSignup)
    const inputSignin = {
        email,
        password: "123456"
    }
    const tokenService = new JwtTokenAdapter()
    const signin = new Signin(accountRepository, tokenService)
    expect(() => signin.execute(inputSignin)).rejects.toThrow(new Error("Invalid credentials"))
    await databaseConnection.close()
})
