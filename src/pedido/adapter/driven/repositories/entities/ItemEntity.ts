import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { PedidoEntity } from "./PedidoEntity";
import { Item } from "src/pedido/core/domain/Item";
import { ProdutoEntity } from "../../../../../gerencial";

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

  // @ManyToOne(() => ProdutoEntity, (produto) => produto.itens)
  // produto?: ProdutoEntity;

  @ManyToOne(() => PedidoEntity, (pedido) => pedido.itens)
  pedido?: PedidoEntity;

  constructor(item?: Item, pedidoEntity?: PedidoEntity){
    this.id = item?.id;
    this.pedido = pedidoEntity as never;
    //this.produto = new ProdutoEntity(item?.produto);
    this.quantidade = item?.quantidade;
    this.valorUnitario = item?.valorUnitario;
    this.valorTotal = item?.valorTotal;
  }

  public getDomain(): Item {

    return new Item(
        this.id,
        this.pedido?.getDomain(),
        undefined,//this.produto?.getDomain(),
        this.quantidade,
        this.valorUnitario
    );
  }
}