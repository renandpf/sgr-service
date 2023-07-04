import { AlterarClienteParamsDto } from "../../../dto/cliente/flows/AlterarClienteParamsDto";
import { AlterarClienteReturnDto } from "../../../dto/cliente/flows/AlterarClienteReturnDto";

export interface IAlterarClienteUseCase {
    alterar(requestDto: AlterarClienteParamsDto): Promise<AlterarClienteReturnDto>;
}