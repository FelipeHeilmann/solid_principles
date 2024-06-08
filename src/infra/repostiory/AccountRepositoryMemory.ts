import Account from "../../domain/entity/Account";
import AccountRepository from "../../domain/repository/AccountRepository";

export default class AccountRepositoryMemory implements AccountRepository {
    private accounts: Account[]

    constructor() {
        this.accounts = []
    }

    async getByEmail(email: string): Promise<Account | undefined> {
        const account = this.accounts.find(account => account.getEmail() === email)
        return account
    }

    async save(account: Account): Promise<void> {
        this.accounts.push(account)
    }
}