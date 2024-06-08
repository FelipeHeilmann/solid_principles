import crypto from "node:crypto"
import Email from "../vo/Email"
import Name from "../vo/Name"
import CPF from "../vo/CPF"
import Password, { BcryptPassword } from "../vo/Password"

export default class Account { 
    private constructor(readonly id: string, private name: Name, private email: Email, private cpf: CPF, private password: Password){
    }

    static async create(name: string, email: string, document: string, password: string) {
        const id = crypto.randomUUID()
        return new Account(id, new Name(name), new Email(email), new CPF(document), await BcryptPassword.create(password))
    }

    static restore(id: string, name: string, email: string, document: string, password: string) {
        return new Account(id, new Name(name), new Email(email), new CPF(document), BcryptPassword.restore(password))
    }

    getName() {
        return this.name.getValue()
    }

    getEmail() {
        return this.email.getValue()
    }

    getCPF() {
        return this.cpf.getValue()
    }

    getPassword() {
        return this.password.getValue()
    }
}