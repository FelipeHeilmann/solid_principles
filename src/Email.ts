export default class Email {
    private value: string

    constructor(email: string) {
        if(!email.match(/^[a-z0-9.]+@[a-z0-9]+\.[a-z]+\.([a-z]+)?$/i)) throw Error("Invalid email")
        this.value = email
    }

    getValue() {
        return this.value
    }
}