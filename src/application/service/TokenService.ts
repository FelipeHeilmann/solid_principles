export default interface TokenService {
    create(id: string, email: string): string
    verify(token: string): any
}