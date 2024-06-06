import crypto from "node:crypto"
import Email from "./Email"
import Period from "./Period"

export default class Reservation {
    private constructor(readonly id: string, readonly roomId: string, readonly status: string ,readonly email: Email,  readonly period: Period){

    }

    static create(roomId: string, email: string, checkinDate: string, checkoutDate: string) {
        const id = crypto.randomUUID()
        const status = "created"
        return new Reservation(id, roomId, status, new Email(email), new Period(checkinDate, checkoutDate))
    }

    static restore(id: string, roomId: string, email: string, status: string ,checkinDate: string, checkoutDate: string) {
        return new Reservation(id, roomId, status, new Email(email), new Period(checkinDate, checkoutDate))
    }
}