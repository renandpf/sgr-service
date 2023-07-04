import { AlterarProdutoParamsDto } from "src/gerencial/core/dto/produto/flows/AlterarProdutoParamsDto";
import { AlterarProdutoReturnDto } from "src/gerencial/core/dto/produto/flows/AlterarProdutoReturnDto";

export const IAlterarProdutoUseCase: unique symbol = Symbol("IAlterarProdutoUseCase");

export interface IAlterarProdutoUseCase {
    alterar(dto: AlterarProdutoParamsDto): Promise<AlterarProdutoReturnDto>;
}