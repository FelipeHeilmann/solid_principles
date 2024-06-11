import 'dotenv/config'
import AccountController from "./api/controller/AccountController";
import Signin from "./application/usecase/Signin";
import Signup from "./application/usecase/Signup";
import { PgPromiseAdapter } from "./infra/database/DatabaseConnection";
import FastifyAdapter from "./infra/http/FastifyAdapter";
import AccountRepositoryDatabase from "./infra/repostiory/AccountRepositoryDatabase";
import JwtTokenAdapter from "./infra/service/JwtTokenAdapter";

const connection = new PgPromiseAdapter()
const accountRepository = new AccountRepositoryDatabase(connection)
const tokenService = new JwtTokenAdapter()
const signup = new Signup(accountRepository)
const signin = new Signin(accountRepository, tokenService)
const httpServer = new FastifyAdapter()
new AccountController(httpServer, signup, signin)

httpServer.listen(3333)