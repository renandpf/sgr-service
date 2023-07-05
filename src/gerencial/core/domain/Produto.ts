import { CategoriaEnum } from "./CategoriaEnum";

export class Produto {
    constructor(
        readonly id?: number,
        readonly nome?: string,
        readonly descricao?: string,
        readonly valor?: number,
        readonly categoria?: CategoriaEnum,
        readonly imagem?: string
    ){}
}