import jwt from 'jsonwebtoken';
import TokenService from "../../application/service/TokenService";

export default class JwtTokenAdapter implements TokenService {

    constructor(readonly secretKey: string) {
    }

    create(id: string, email: string): string {
        return jwt.sign({ sub: id, email }, this.secretKey, { expiresIn: '1h' })
    }

    verify(token: string) {
        return jwt.verify(token, this.secretKey);
    }

}