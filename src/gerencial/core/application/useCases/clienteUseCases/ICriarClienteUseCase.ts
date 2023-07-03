import { CriarClienteParamsDto } from "../../../dto/cliente/flows/CriarClienteParamsDto";
import { CriarClienteReturnDto } from "../../../dto/cliente/flows/CriarClienteReturnDto";

export interface ICriarClienteUseCase {
    criar(dto: CriarClienteParamsDto): Promise<CriarClienteReturnDto>;
}