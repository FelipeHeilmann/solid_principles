import { InvalidPasswordLenght } from "../../src/domain/exceptions/DomainExceptions"
import { BcryptPassword } from "../../src/domain/vo/Password"

test("Deve criar uma senha bcrypt válida", function() {
    const password = BcryptPassword.create("1234567")
    expect(password.getValue()).toBeDefined()
})

test("Deve validar senhas iguais", function() {
    const password = BcryptPassword.create("1234567")
    expect(password.passwordMatches("1234567")).toBe(true)
})

test("Não deve criar uma senha bcrypt com tamanho inválido", function() {
    expect(() => BcryptPassword.create("1234")).toThrow(new InvalidPasswordLenght())
})

test("Não deve validar senhas diferentes", function() {
    const password = BcryptPassword.create("1234567")
    expect(password.passwordMatches("123456")).toBe(false)
})