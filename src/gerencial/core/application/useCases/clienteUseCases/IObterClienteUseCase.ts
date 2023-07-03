import { Cliente } from "../../../domain/Cliente";

export interface IObterClienteUseCase {

    obterPorId(id: number): Promise<Cliente>;
    obterPorCpf(cpf: string): Promise<Cliente>;
    obterPorEmail(email: string): Promise<Cliente>;

}