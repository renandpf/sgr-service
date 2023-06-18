import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { PedidoEntity } from "./PedidoEntity";
import { Item } from "src/pedido/core/domain/Item";

@Entity("Item")
export class ItemEntity {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column({
    nullable: false
  })
  quantidade?: number;

  @Column({
    type: "float",
    nullable: false
  })
  valorUnitario?: number;

  @Column({
    type: "float",
    nullable: false
  })
  valorTotal?: number;

  @ManyToOne(() => PedidoEntity, (pedido) => pedido.itens)
  pedido?: PedidoEntity;

  constructor(item?: Item, pedidoEntity?: PedidoEntity){
    this.id = item?.id;
    this.pedido = pedidoEntity;
  }

}