import { CategoriaEnum, Produto } from "../../../..";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { Exception } from "@tsed/exceptions";

@Entity("Produto")
export class ProdutoEntity {
    @PrimaryGeneratedColumn()
    id?: number;

    @Column({
        type: "varchar",
        length: 100,
        nullable: false
    })
    nome?: string;

    @Column({
        type: "varchar",
        length: 500,
        nullable: true
    })
    descricao?: string;

    @Column({
        type: "text",
        nullable: true
    })
    imagem?: string;

    @Column({
        type: "float",
        nullable: false
    })
    valor?: number;

    @Column({
        nullable: false
    })
    categoriaId?: number;

    constructor(produto?: Produto){
        if(produto){
            if(produto.id){
                this.id = produto.id;
            }
            this.nome = produto.nome;
            this.descricao = produto.descricao;
            this.valor = produto.valor;
            this.imagem = produto.imagem;
            if(produto.categoria !== undefined){
                this.categoriaId = <number>produto.categoria;
            }
        }
    }

    public getDomain(): Produto{
        return new Produto(this.id, this.nome, this.descricao,
            this.valor, this.traduzirCategoria(this.categoriaId), this.imagem);
    }

    private traduzirCategoria(codigo: number | undefined): CategoriaEnum {

        switch (codigo){
            case 0:
                return CategoriaEnum.LANCHE;
            case 1:
                return CategoriaEnum.ACOMPANHAMENTO;
            case 2:
                return CategoriaEnum.BEBIDA;
            case 3:
                return CategoriaEnum.SOBREMESA;
            default:
                throw new Exception(500,"Categoria Inválida");
        }
    }
}