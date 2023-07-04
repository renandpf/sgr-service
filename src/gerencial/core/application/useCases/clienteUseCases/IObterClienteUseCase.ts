import { ClienteDto } from "../../../dto/cliente/ClienteDto";

export const IObterClienteUseCase: unique symbol = Symbol("IObterClienteUseCase");

export interface IObterClienteUseCase {
    obterPorId(id: number): Promise<ClienteDto>;
    obterPorCpf(cpf: string): Promise<ClienteDto>;
    obterPorEmail(email: string): Promise<ClienteDto>;
}