import { AlterarClienteParamsDto } from "../../../dto/cliente/flows/AlterarClienteParamsDto";
import { AlterarClienteResponseDto } from "../../../dto/cliente/flows/AlterarClienteReturnDto";

export interface IAlterarClienteUseCase {
    alterar(requestDto: AlterarClienteParamsDto): Promise<AlterarClienteResponseDto>;
}