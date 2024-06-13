import { InvalidPeriod } from "../../src/domain/exceptions/DomainExceptions"
import Period from "../../src/domain/vo/Period"

test("Deve criar um período válido", function() {
    const period = new Period("2024-06-06T10:00:00", "2024-06-07T10:00:00")
    expect(period.getStart()).toEqual(new Date("2024-06-06T10:00:00"))
    expect(period.getEnd()).toEqual(new Date("2024-06-07T10:00:00"))
    expect(period.getDurationInDays()).toBe(1)
    expect(period.getDurationInHours()).toBe(24)
})

test("Não deve criar um período válido", function() {
    expect(() => new Period("2024-06-08T10:00:00", "2024-06-07T10:00:00")).toThrow(new InvalidPeriod())
})