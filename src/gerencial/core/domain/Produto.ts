import { CategoriaEnum } from "./CategoriaEnum";
import { ProdutoValidacaoException } from "../application/exception/ProdutoValidacaoException";

export class Produto {
    constructor(
        readonly id?: number,
        readonly nome?: string,
        readonly descricao?: string,
        readonly valor?: number,
        readonly categoria?: CategoriaEnum,
        readonly imagem?: string
    ){}

    validar(){
        if(!this.nome){
            throw new ProdutoValidacaoException("Nome é obrigatório");
        }else if(!this.valor){
            throw new ProdutoValidacaoException("Valor é obrigatório");
        }
        else if(!this.categoria){
            throw new ProdutoValidacaoException("Categoria é obrigatória");
        }
    }
}