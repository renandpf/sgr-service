import {Maximum, MaxLength, Minimum, Property, Required} from "@tsed/schema";
import { ClienteEntity } from "src/gerencial/adapter/driven/repositories/entity";
import {Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import { ItemEntity } from "./ItemEntity";

@Entity("Pedido")
export class PedidoEntity {
  @PrimaryGeneratedColumn()
  @Property()
  id?: number;

  @ManyToOne(() => ClienteEntity, (cliente) => cliente.pedidos)
  cliente?: ClienteEntity;
  
  @OneToMany(() => ItemEntity, (item) => item.pedido)
  itens?: ItemEntity[];
}