import Email from "../../src/domain/vo/Email"

test("Deve criar um email válido", function() {
    const email = new Email("joe.doe@gmail.com")
    expect(email.getValue()).toBe("joe.doe@gmail.com")
})

test("Não deve criar um email válido", function() {
    expect(() => new Email("joe.doe")) 
})