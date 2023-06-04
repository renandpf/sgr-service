import { Cliente } from "../../domain/Cliente";

export interface IClienteRepositoryGateway {
    obterById(id: number): Promise<Cliente>;
    obterByCpf(cpf: string): Promise<Cliente>;
    obterByEmail(email: string): Promise<Cliente>;
}