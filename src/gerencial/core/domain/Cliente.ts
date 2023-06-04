import { AlterarCLienteDTO } from "../application/useCases/clienteUseCases/dtos/AlterarClienteDTO";

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