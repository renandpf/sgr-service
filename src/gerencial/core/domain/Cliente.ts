import { AlterarCLienteDTO } from "../application";

export class Cliente {
    constructor(
        readonly id: number,
        readonly nome: string, 
        readonly cpf: string,
        readonly email: string
    ){}

    set(cliente: AlterarCLienteDTO) {
        return new Cliente(this.id, cliente.nome, this.cpf, cliente.email)
    }
}