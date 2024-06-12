import 'dotenv/config'
import AccountController from "./api/controller/AccountController";
import Signin from "./application/usecase/Signin";
import Signup from "./application/usecase/Signup";
import { PgPromiseAdapter } from "./infra/database/DatabaseConnection";
import FastifyAdapter from "./infra/http/FastifyAdapter";
import AccountRepositoryDatabase from "./infra/repostiory/AccountRepositoryDatabase";
import JwtTokenAdapter from "./infra/service/JwtTokenAdapter";
import ReservationController from './api/controller/ResevationController';
import MakeReservation from './application/usecase/MakeReservation';
import ReservationRepositoryDatabase from './infra/repostiory/ReservationRepositoryDatabase';
import RoomRepositoryDatabase from './infra/repostiory/RoomRepositoryDatabase';
import GetReservationQuery from './application/query/GetReservationQuery';
import CancelReservation from './application/usecase/CancelReservation';

const connection = new PgPromiseAdapter()
const accountRepository = new AccountRepositoryDatabase(connection)
const roomRepository = new RoomRepositoryDatabase(connection)
const reservationRepository = new ReservationRepositoryDatabase(connection)
const tokenService = new JwtTokenAdapter()
const signup = new Signup(accountRepository)
const signin = new Signin(accountRepository, tokenService)
const makeReservation = new MakeReservation(roomRepository,reservationRepository)
const cancelReservation = new CancelReservation(reservationRepository)
const getReservationQuery = new GetReservationQuery(connection)
const httpServer = new FastifyAdapter()
new AccountController(httpServer, signup, signin)
new ReservationController(httpServer, makeReservation, getReservationQuery, cancelReservation)

httpServer.listen(3333)