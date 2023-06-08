
export class Cliente {
    constructor(
        readonly nome: string,
        readonly cpf: string,
        readonly email: string,
        readonly id?: number
    ){}

    set(clienteAlt: Cliente) {
        return new Cliente(clienteAlt.nome, this.cpf, clienteAlt.email, this.id)
    }
}