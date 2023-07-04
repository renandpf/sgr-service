import { ProdutoDto } from "../ProdutoDto";

export class AlterarProdutoParamsDto {
    constructor(public readonly produto: ProdutoDto){}
}