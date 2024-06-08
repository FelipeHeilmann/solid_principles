import jwt from 'jsonwebtoken';
import TokenService from "../../application/service/TokenService";

export default class JwtTokenAdapter implements TokenService {
    private secretKey: string

    constructor() {
        const envSecret = process.env.SECRET
        if(!envSecret) throw new Error("No secret was provided")
        this.secretKey = envSecret
    }

    create(id: string, email: string): string {
        return jwt.sign({ id, email }, this.secretKey, { expiresIn: '1h' })
    }

    verify(token: string) {
        return jwt.verify(token, this.secretKey);
    }

}