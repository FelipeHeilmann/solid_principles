import crypto from "node:crypto"
import Email from "./Email"
import Period from "./Period"
import Room from "./Room"
import { PriceCalculatorFactory } from "./PriceCalculator"

export default class Reservation {
    private constructor(readonly id: string, readonly roomId: string, private status: string, private email: Email, readonly period: Period, private price: number, private duration: number) {
    }

    static create(roomId: string, email: string, checkinDate: string, checkoutDate: string) {
        const id = crypto.randomUUID()
        const status = "active"
        const price = 0
        const duration = 0
        return new Reservation(id, roomId, status, new Email(email), new Period(checkinDate, checkoutDate), price, duration)
    }

    static restore(id: string, roomId: string, email: string, status: string ,checkinDate: string, checkoutDate: string, price: number, duration: number) {
        return new Reservation(id, roomId, status, new Email(email), new Period(checkinDate, checkoutDate), price, duration)
    }

    calculate(room: Room) {
        const { duration, price } = PriceCalculatorFactory.create(room.type).calculate(this.period, room.price);
		this.duration = duration
		this.price = price
    }

    getEmail() {
        return this.email.getValue()
    }

    getStatus () {
		return this.status
	}

	getDuration () {
		return this.duration
	}

	getPrice () {
		return this.price
	}

    getCheckinDate() {
        return this.period.getStart()
    }

    getCheckoutDate() {
        return this.period.getEnd()
    }
}