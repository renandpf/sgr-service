import {Maximum, MaxLength, Minimum, Property, Required} from "@tsed/schema";
import { CategoriaEnum, Produto } from "../../../gerencial";
import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity("Produto")
export class ProdutoEntity {
  @PrimaryGeneratedColumn()
  @Property()
  id: number;

  @Column()
  @MaxLength(100)
  @Required()
  nome: string;

  @Column()
  @MaxLength(100)
  @Required()
  valor: number;

  @Column()
  @Minimum(0)
  @Maximum(100)
  categoriaId: number;

  constructor(produto?: Produto){
    if(produto){
      if(produto.id){
        this.id = produto.id;
      }
      this.nome = produto.nome;
      this.valor = produto.valor;
      this.categoriaId = (CategoriaEnum as never)[produto.categoria] + 1;
    }
  }

  public getDomain(): Produto{
    return new Produto(this.nome, this.valor, 1, this.id);
  }
}