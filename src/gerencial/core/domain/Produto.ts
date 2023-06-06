import { CategoriaEnum } from "./CategoriaEnum";

export class Produto {
    constructor(
        readonly nome: string,
        readonly valor: number,
        readonly categoria: CategoriaEnum,
        readonly id?: number,
    ){}
}