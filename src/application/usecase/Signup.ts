import Account from "../../domain/entity/Account"
import AccountRepository from "../../domain/repository/AccountRepository"
import { EmailInUse } from "../exceptions/ApplicationExceptions"

export default class Signup {
    constructor(readonly accountRepository: AccountRepository) {
    }

    async execute(input: Input): Promise<Output> {
        const existingAccount = await this.accountRepository.getByEmail(input.email)
        if(existingAccount) throw new EmailInUse()
        const account = Account.create(input.name, input.email, input.document, input.password)
        await this.accountRepository.save(account)
        return {
            id: account.id
        }
    }
}

type Input = {
    name: string,
    email: string,
    document: string,
    password: string
}

type Output = {
    id: string
}