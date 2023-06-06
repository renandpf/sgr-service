import { CategoriaEnum, Produto } from "../../../../../core/domain";

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
    
    public getDomain(id?: number): Produto{
        if(id){
            return new Produto(this.nome, this.valor, this.categoria, id);
        } 
        return new Produto(this.nome, this.valor, this.categoria, this.id);
    }    
}