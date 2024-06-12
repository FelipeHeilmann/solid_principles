import GetReservationQuery from "../../application/query/GetReservationQuery";
import MakeReservation from "../../application/usecase/MakeReservation";
import HttpServer from "../httpServer";
import { makeReservationSchema } from "../schemas/reservationSchema";

export default class ReservationController {
    constructor(httpServer: HttpServer, makeReservation: MakeReservation, getReservation: GetReservationQuery) {
        httpServer.register("post", "/reservations", async ({ body, accountId }) => {
            const { checkinDate,checkoutDate, roomId } = makeReservationSchema.parse(body)
            const input = {
                accountId: accountId!, 
                checkinDate,
                checkoutDate,
                roomId
            }
            const output = await makeReservation.execute(input)
            return {
                status: 201,
                data: output
            }
        })

        httpServer.register("get", "/reservations/:id", async ({ params }) => {
            const { id } = params as { id: string }
            const output = await getReservation.execute(id)
            return {
                data: output,
                status: 200
            }
        })
    }
}