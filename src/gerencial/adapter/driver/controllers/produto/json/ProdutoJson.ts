import { CategoriaEnum } from "src/gerencial/core/domain";
import { Produto } from "src/gerencial/core/domain";

export class ProdutoJson {
    public readonly id?: number;
    public readonly nome: string;
    public readonly valor: number;
    public readonly categoria: CategoriaEnum;
    
    public constructor(produto: Produto){
        this.id = produto.id;
        this.nome = produto.nome;
        this.valor = produto.valor;
        this.categoria = produto.categoria;
    }

    public getDomain(): Produto{
        return new Produto(this.nome, this.valor, this.categoria, this.id);
    }
}