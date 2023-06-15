import {Maximum, MaxLength, Minimum, Property, Required} from "@tsed/schema";
import {Column, Entity, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import { PedidoEntity } from "./PedidoEntity";

@Entity("Item")
export class ItemEntity {
  @PrimaryGeneratedColumn()
  @Property()
  id?: number;

  @ManyToOne(() => PedidoEntity, (pedido) => pedido.itens)
  pedido: PedidoEntity;
}