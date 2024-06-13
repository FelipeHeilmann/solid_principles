export default abstract class BaseException extends Error {
    constructor(readonly statusCode: number, message: string) {
        super(message)
    }
}