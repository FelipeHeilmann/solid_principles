import Period from "../vo/Period";

export default abstract class PriceCalculator {
    calculate (period: Period, roomPrice: number): { duration: number, price: number } {
		const duration = this.calculateDuration(period);
		const price = duration * roomPrice
		return {
			duration,
			price
		}
	}

	abstract calculateDuration (period: Period): number;
}

export class DayPriceCalculator extends PriceCalculator {
    calculateDuration(period: Period): number {
        return period.getDurationInDays()
    }
}

export class HourPriceCalculator extends PriceCalculator {
    calculateDuration(period: Period): number {
        return period.getDurationInDays()
    }
}

export class PriceCalculatorFactory {
    static create (type: string) {
		if (type === "day") return new DayPriceCalculator()
		if (type === "hour") return new HourPriceCalculator()
		throw new Error()
	}
}