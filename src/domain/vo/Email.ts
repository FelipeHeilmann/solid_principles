import { InvalidEmail } from "../exceptions/DomainExceptions"

export default class Email {
    private value: string

    constructor(email: string) {
        if (!email.match(/^(.+)@(.+)$/)) throw new InvalidEmail()
        this.value = email
    }

    getValue() {
        return this.value
    }
}