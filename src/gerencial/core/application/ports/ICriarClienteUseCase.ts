import { CriarClienteParamsDto } from "../../dto/cliente/flows/CriarClienteParamsDto";
import { CriarClienteReturnDto } from "../../dto/cliente/flows/CriarClienteReturnDto";

export const ICriarClienteUseCase: unique symbol = Symbol("ICriarClienteUseCase");

export interface ICriarClienteUseCase {
    criar(dto: CriarClienteParamsDto): Promise<CriarClienteReturnDto>;
}