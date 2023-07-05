export class ClienteDto {
    constructor(
        readonly id?: number,
        readonly nome?: string,
        readonly cpf?: string,
        readonly email?: string,) {}
}