import {Property} from "@tsed/schema";
import { Entity, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import { PedidoEntity } from "./PedidoEntity";
import { Item } from "src/pedido/core/domain/Item";

@Entity("Item")
export class ItemEntity {
  @PrimaryGeneratedColumn()
  @Property()
  id?: number;

  @ManyToOne(() => PedidoEntity, (pedido) => pedido.itens)
  pedido?: PedidoEntity;

  constructor(item?: Item, pedidoEntity?: PedidoEntity){
    this.id = item?.id;
    this.pedido = pedidoEntity;
  }

}