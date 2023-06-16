import { Cliente } from "src/gerencial";
import { Optional } from "typescript-optional";

export interface IClienteRepositoryGateway {
    obterPorId(clienteId: number): Promise<Optional<Cliente>>;
}