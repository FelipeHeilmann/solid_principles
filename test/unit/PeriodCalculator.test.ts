import { DayPriceCalculator, HourPriceCalculator } from "../../src/domain/service/PriceCalculator"
import Period from "../../src/domain/vo/Period"

test("Deve calcular o preço e período por dia", function() {
    const dayPriceCalculator = new DayPriceCalculator()
    const { duration, price } = dayPriceCalculator.calculate(new Period("2024-06-06T10:00:00", "2024-06-08T10:00:00"), 100)
    expect(duration).toBe(2)
    expect(price).toBe(200)
})

test("Deve calcular o preço e período por hora", function() {
    const hourPriceCalculator = new HourPriceCalculator()
    const { duration, price } = hourPriceCalculator.calculate(new Period("2024-06-06T10:00:00", "2024-06-08T10:00:00"), 50)
    expect(duration).toBe(48)
    expect(price).toBe(2400)
})