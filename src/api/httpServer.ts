export default interface HttpServer {
    listen(port: number): void
    register(method: string, url: string,callback: (input: ControllerCallbackInput) => Promise<ControllerResponse>, allowAnonymous?: boolean): void
}

export type ControllerCallbackInput = {
    params: unknown,
    body: unknown,
    query: unknown,
    userId: string | undefined,
    headers: unknown
}

export type ControllerResponse = {
    data?: unknown
    status: number
}