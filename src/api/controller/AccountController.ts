import Signup from "../../application/usecase/Signup";
import HttpServer from "../httpServer";
import { signupShema } from "../schemas/signupSchema";

export default class AccountController {
    constructor(httpServer: HttpServer, signup: Signup) {
        httpServer.register('post', '/signup', async function({ body }) {
            const { document, email, password,name } = signupShema.parse(body)
            const input = {
                name,
                email,
                password,
                document
            }
            const output = await signup.execute(input)
            return {
                status: 201,
                data: output
            }
        })
    }
}