import { Cliente } from "src/gerencial/core/domain/Cliente";

export class CLienteDTO {
    constructor (readonly nome: string, readonly cpf: string, readonly email: string){
    }
}