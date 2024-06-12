import z from "zod"

const makeReservationSchema = z.object({
    roomId: z.string(),
    checkinDate: z.string(),
    checkoutDate: z.string()
})

export { makeReservationSchema }