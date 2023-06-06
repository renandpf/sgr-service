import { Cliente } from "../../domain";

export interface IClienteRepositoryGateway {
    obterPorId(id: number): Promise<Cliente | null>;
    obterPorCpf(cpf: string): Promise<Cliente | null>;
    obterPorEmail(email: string): Promise<Cliente | null>;
    criar(cliente: Cliente): Promise<Cliente>;
    alterar(cliente: Cliente): Promise<Cliente>;
}
