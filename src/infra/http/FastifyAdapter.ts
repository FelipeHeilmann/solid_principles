import fastify, { FastifyInstance, FastifyReply, FastifyRequest, HTTPMethods } from "fastify";
import cors from '@fastify/cors'
import jwt from '@fastify/jwt'
import HttpServer, { ControllerCallbackInput, ControllerResponse } from "../../api/httpServer";

export default class FastifyAdapter implements HttpServer {
    private app: FastifyInstance

    constructor() {
        this.app = fastify()
        this.app.register(jwt, {
            secret: process.env.SECRET!
        })
        this.app.register(cors, {
            origin: true
        })
    }

    listen(port: number): void {
        this.app.listen({
            port: port,
            host: '0.0.0.0'
        }).then(() => {
            console.log(`HTTP server running on port ${port}`)
        })
    }

    register(method: string, url: string, callback: (input: ControllerCallbackInput) => Promise<ControllerResponse>, allowAnonymous?: boolean | undefined): void {
        this.app.route({
            method: method as HTTPMethods,
            url,
            handler: async (req: FastifyRequest, reply: FastifyReply) => {
                if(!allowAnonymous) await req.jwtVerify()
                const output = await callback({
                    params: req.params, 
                    body: req.body, 
                    query: req.query, 
                    accountId: !allowAnonymous ? req.user.sub : undefined, 
                    headers: req.headers,
                })
                reply.status(output.status).send(output.data && output.data)
            }
        })
    }
}