import { Cliente } from "../../../../gerencial";
import { Optional } from "typescript-optional";

export const IClienteServiceGateway: unique symbol = Symbol("IClienteServiceGateway");

export interface IClienteServiceGateway {
    obterPorId(clienteId: number): Promise<Optional<Cliente>>;
}