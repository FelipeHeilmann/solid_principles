import Account from "../entity/Account";

export default interface AccountRepository {
    getByEmail(email: string): Promise<Account | undefined>
    save(account: Account): Promise<void>
}