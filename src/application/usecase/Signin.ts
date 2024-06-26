import AccountRepository from "../../domain/repository/AccountRepository";
import { InvalidCredentials } from "../exceptions/ApplicationExceptions";
import TokenService from "../service/TokenService";

export default class Signin {
    constructor(readonly accountRepostiry: AccountRepository, readonly tokenService: TokenService) {
    }

    async execute(input: Input): Promise<Output> {
        const account = await this.accountRepostiry.getByEmail(input.email)
        if(!account) throw new InvalidCredentials()
        if(!account.passwordMatches(input.password)) throw new InvalidCredentials()
        const token = this.tokenService.create(account.id, account.getEmail())
        return  {
            token
        }
    }
}

type Input = {
    email: string,
    password: string
}

type Output = {
    token: string
}