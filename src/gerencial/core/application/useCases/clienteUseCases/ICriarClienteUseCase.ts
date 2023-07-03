import { Cliente } from "../../../domain/Cliente";

export interface ICriarClienteUseCase {
    criar(clienteReq: Cliente): Promise<Cliente>;
}