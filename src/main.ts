import AccountController from "./api/controller/AccountController";
import Signup from "./application/usecase/Signup";
import { PgPromiseAdapter } from "./infra/database/DatabaseConnection";
import FastifyAdapter from "./infra/http/FastifyAdapter";
import AccountRepositoryDatabase from "./infra/repostiory/AccountRepositoryDatabase";

const connection = new PgPromiseAdapter()
const accountRepository = new AccountRepositoryDatabase(connection)
const signup = new Signup(accountRepository)
const httpServer = new FastifyAdapter()
new AccountController(httpServer, signup)

httpServer.listen(3333)