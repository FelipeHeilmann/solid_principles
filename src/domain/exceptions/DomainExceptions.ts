import BaseException from "../../application/exceptions/BaseException";

export class InvalidEmail extends BaseException {
    constructor() {
        super(400, "Invalid email")
    }
}

export class InvalidName extends BaseException {
    constructor() {
        super(422, "Invalid name")
    }
}

export class InvalidCPF extends BaseException {
    constructor() {
        super(422, "Invalid cpf")
    }
}

export class InvalidPeriod extends BaseException {
    constructor() {
        super(422, "Invalid period")
    }
}

export class InvalidPasswordLenght extends BaseException {
    constructor() {
        super(422, "Password length must be greater than 5")
    }
}

export class InvalidRoomType extends BaseException {
    constructor() {
        super(422, "Invalid room type")
    }
}