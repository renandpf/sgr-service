import { Cliente } from "../../../../gerencial";
import { Optional } from "typescript-optional";

export interface IClienteServiceGateway {
    obterPorId(clienteId: number): Promise<Optional<Cliente>>;
}