import bcrypt from 'bcrypt'

export default abstract class Password {
    protected value: string

    protected constructor(password: string){
        this.value = password
    }

    getValue() {
        return this.value
    }

    abstract passwordMatches(password: string): boolean
}

export class BcryptPassword extends Password {
    protected constructor(password: string) {
        super(password)
    }

    static create(password: string) {
        if(password.length < 5) throw new Error("Password length must be greater than 5")
        const salt = bcrypt.genSaltSync(12)
        const hashPassword = bcrypt.hashSync(password, salt)
        return new BcryptPassword(hashPassword)
    }

    static restore(password: string) {
        return new BcryptPassword(password)
    }
    
    passwordMatches(password: string): boolean {
       return bcrypt.compareSync(password, this.getValue())
    }
}