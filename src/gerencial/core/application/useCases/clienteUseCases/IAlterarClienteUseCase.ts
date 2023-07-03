import { Cliente } from "../../../domain/Cliente";

export interface IAlterarClienteUseCase {
    alterar(clienteReq: Cliente): Promise<Cliente>;
}