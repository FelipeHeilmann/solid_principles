import { InvalidName } from "../../src/domain/exceptions/DomainExceptions"
import Name from "../../src/domain/vo/Name"

test("Deve criar um nome válido", function() {
    const name = new Name("Jonas Furtado")
    expect(name.getValue()).toBe("Jonas Furtado")
})

test("Não deve criar um nome válido", function() {
    expect(() => new Name("Jonas")).toThrow(new InvalidName())
})