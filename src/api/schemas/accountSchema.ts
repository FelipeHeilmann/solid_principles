import z from "zod"

const signupShema = z.object({
    name: z.string(),
    email: z.string(),
    document: z.string(),
    password: z.string()
})

const signinSchema = z.object({
    email: z.string(),
    password: z.string()
}) 

export { signupShema,signinSchema }