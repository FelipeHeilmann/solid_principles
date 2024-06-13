import BaseException from "./BaseException";

export class RoomAlreadyReserved extends BaseException {
    constructor() {
        super(400, "Room is already reserved for this date")
    }
}

export class InvalidCredentials extends BaseException {
    constructor() {
        super(400, "Invalid credentials")
    }
}

export class EmailInUse extends BaseException {
    constructor() {
        super(400, "Email already in use")
    }
}