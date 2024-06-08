import Account from "../../domain/entity/Account";
import AccountRepository from "../../domain/repository/AccountRepository";
import DatabaseConnection from "../database/DatabaseConnection";

export default class AccountRepositoryDatabase implements AccountRepository {
    constructor(readonly connection: DatabaseConnection) {
    }

    async getByEmail(email: string): Promise<Account | undefined> {
        const [accountData] = await this.connection.query("select * from solid.accounts where email = $1", [email])
        if(!accountData) return undefined
        return Account.restore(accountData.id, accountData.name, accountData.email, accountData.cpf, accountData.password)
    }

    async save(account: Account): Promise<void> {
        await this.connection.query("insert into solid.accounts (id, name, email, cpf, password) values ($1, $2, $3, $4, $5)",
            [account.id, account.getName(), account.getEmail(), account.getCPF(), account.getPassword()])
    }

}