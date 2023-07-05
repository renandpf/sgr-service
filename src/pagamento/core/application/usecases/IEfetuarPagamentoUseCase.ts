import { EfetuarPagamentoParamDto } from "../../dto/flows/EfetuarPagamentoParamDto";
import { EfetuarPagamentoReturnDto } from "../../dto/flows/EfetuarPagamentoReturnDto";

export const IEfetuarPagamentoUseCase: unique symbol = Symbol("IEfetuarPagamentoUseCase");

export interface IEfetuarPagamentoUseCase {
    efetuar(dto: EfetuarPagamentoParamDto): Promise<EfetuarPagamentoReturnDto>;
}