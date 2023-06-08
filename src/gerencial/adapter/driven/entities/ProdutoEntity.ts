import {Maximum, MaxLength, Minimum, Property, Required} from "@tsed/schema";
import { Produto } from "../../../core/domain";
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

  public getDomain(): Produto{
    return new Produto(this.nome, this.valor, 1, this.id);
  }
}