import { ProdutoDto } from "../ProdutoDto";

export class CriarProdutoParamsDto {
    constructor(readonly produto: ProdutoDto){}
}