import { Cliente } from "../../domain";
import { Optional } from "typescript-optional";

export interface IClienteRepositoryGateway {
    obterPorId(id: number): Promise<Optional<Cliente>>;
    obterPorCpf(cpf: string): Promise<Optional<Cliente>>;
    obterPorEmail(email: string): Promise<Optional<Cliente>>;
    criar(cliente: Cliente): Promise<Cliente>;
    alterar(cliente: Cliente): Promise<Cliente>;
}
