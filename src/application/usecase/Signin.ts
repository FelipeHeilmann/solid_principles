import AccountRepository from "../../domain/repository/AccountRepository";
import TokenService from "../service/TokenService";

export default class Signin {
    constructor(readonly accountRepostiry: AccountRepository, readonly tokenService: TokenService) {
    }

    async execute(input: Input): Promise<Output> {
        const account = await this.accountRepostiry.getByEmail(input.email)
        if(!account) throw new Error("Invalid credentials")
        if(!account.passwordMatches(input.password)) throw new Error("Invalid credentials")
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