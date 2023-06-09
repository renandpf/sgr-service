import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { ProdutoDto } from "../../../../core/dto/produto/ProdutoDto";

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

    constructor(produto?: ProdutoDto){
        if(produto){
            if(produto.id){
                this.id = produto.id;
            }
            this.nome = produto.nome;
            this.descricao = produto.descricao;
            this.valor = produto.valor;
            this.imagem = undefined;
            this.categoriaId = produto.categoriaId;
        }
    }

    public getProdutoDto(): ProdutoDto {
        return new ProdutoDto(this.id, this.nome, this.descricao, this.valor, this.categoriaId);
    }
}