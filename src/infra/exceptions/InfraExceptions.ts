import BaseException from "../../application/exceptions/BaseException";

export class NotFound extends BaseException {
    constructor(name: string) {
        super(404, `${name} not found`)
    }
}

export class NoSecretProvided extends BaseException {
    constructor() {
        super(500, "No secret was provided")
    }
}