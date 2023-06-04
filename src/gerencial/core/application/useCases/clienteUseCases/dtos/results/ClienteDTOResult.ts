import { Cliente } from "src/gerencial/core/domain/Cliente";

export class CLienteDTOResult {
    public id: number;
    public nome: string;
    public cpf: string;
    public email: string;

    constructor (private readonly cliente: Cliente){
        this.id = cliente.id;
        this.nome = cliente.nome;
        this.email = cliente.email;
        this.cpf = cliente.cpf;
    }
}