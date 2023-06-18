import { CategoriaEnum, Produto } from "../../../../core/domain";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { CategoriaEnumMapper } from "../../../../core/domain/CategoriaEnumMapper";

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
                this.categoriaId = (CategoriaEnum as never)[produto.categoria];
            }
        }
    }

    public getDomain(): Produto{
        return new Produto(this.id, this.nome, this.descricao,
            this.valor, CategoriaEnumMapper.numberParaEnum(this.categoriaId), this.imagem);
    }
}