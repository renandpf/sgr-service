import { AlterarClienteParamsDto } from "../../dto/cliente/flows/AlterarClienteParamsDto";
import { AlterarClienteReturnDto } from "../../dto/cliente/flows/AlterarClienteReturnDto";

export const IAlterarClienteUseCase: unique symbol = Symbol("IAlterarClienteUseCase");

export interface IAlterarClienteUseCase {
    alterar(requestDto: AlterarClienteParamsDto): Promise<AlterarClienteReturnDto>;
}