import Signin from "../../application/usecase/Signin";
import Signup from "../../application/usecase/Signup";
import HttpServer from "../httpServer";
import { signinSchema, signupShema } from "../schemas/accountSchema";

export default class AccountController {
    constructor(httpServer: HttpServer, signup: Signup, signin: Signin) {
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
        }, true)

        httpServer.register('post', '/auth', async function({ body }) {
            const { email, password } = signinSchema.parse(body)
            const input = {
                email,
                password
            }
            const output = await signin.execute(input)
            return {
                status: 200,
                data: output
            }
        }, true)
    }
}