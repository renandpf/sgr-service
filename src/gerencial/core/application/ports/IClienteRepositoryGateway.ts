import { Optional } from "typescript-optional";
import { CriarClienteParamsDto } from "../../dto/cliente/flows/CriarClienteParamsDto";
import { CriarClienteReturnDto } from "../../dto/cliente/flows/CriarClienteReturnDto";
import { AlterarClienteParamsDto } from "../../dto/cliente/flows/AlterarClienteParamsDto";
import { AlterarClienteReturnDto } from "../../dto/cliente/flows/AlterarClienteReturnDto";
import { ClienteDto } from "../../dto/cliente/ClienteDto";

export const IClienteRepositoryGateway: unique symbol = Symbol("IClienteRepositoryGateway");

export interface IClienteRepositoryGateway {
    obterPorId(id: number): Promise<Optional<ClienteDto>>;
    obterPorCpf(cpf: string): Promise<Optional<ClienteDto>>;
    obterPorEmail(email: string): Promise<Optional<ClienteDto>>;
    criar(dto: CriarClienteParamsDto): Promise<CriarClienteReturnDto>;
    alterar(dto: AlterarClienteParamsDto): Promise<AlterarClienteReturnDto>;
}
