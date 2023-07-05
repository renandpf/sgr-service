export class ProdutoDto {
    constructor(
        readonly id?: number,
        readonly nome?: string,
        readonly descricao?: string,
        readonly valor?: number,
        readonly categoriaId?: number,
    ){}

}