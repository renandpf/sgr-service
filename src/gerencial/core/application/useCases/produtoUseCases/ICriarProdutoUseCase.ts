import { CriarProdutoParamsDto } from "src/gerencial/core/dto/produto/flows/CriarProdutoParamsDto";
import { CriarProdutoReturnDto } from "src/gerencial/core/dto/produto/flows/CriarProdutoReturnDto";

export const ICriarProdutoUseCase: unique symbol = Symbol("ICriarProdutoUseCase");

export interface ICriarProdutoUseCase {
    criar(dto: CriarProdutoParamsDto): Promise<CriarProdutoReturnDto>;
}