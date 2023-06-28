import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { PedidoEntity } from "./PedidoEntity";
import { Item } from "../../../../../pedido/core/domain/Item";
import { ProdutoEntity } from "../../../../../gerencial/adapter/driven/repositories/entities/ProdutoEntity";

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

  @ManyToOne(() => ProdutoEntity, { nullable: false })
  produto?: ProdutoEntity;

  @ManyToOne(() => PedidoEntity, (pedido) => pedido.itens, { nullable: false })
  pedido?: PedidoEntity;

  constructor(item?: Item, pedidoEntity?: PedidoEntity) {
    this.id = item?.id;
    this.pedido = pedidoEntity;
    if (item?.produto) {
      this.produto = new ProdutoEntity(item.produto);
    }
    this.quantidade = item?.quantidade;
    this.valorUnitario = item?.valorUnitario;
    this.valorTotal = item?.valorTotal;
  }

  public getDomain(): Item {

    return new Item(
      this.id,
      this.pedido?.getDomain(),
      this.produto?.getDomain(),
      this.quantidade,
      this.valorUnitario
    );
  }
}