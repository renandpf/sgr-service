
import { ClienteEntity } from "src/gerencial/adapter/driven/repositories/entities";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { ItemEntity } from "./ItemEntity";
import { Pedido } from "src/pedido/core/domain/Pedido";
import { StatusPedidoMapper } from "./StatusMapper";

@Entity("Pedido")
export class PedidoEntity {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column({
    nullable: false
  })
  statusId?: number;

  @Column({
    nullable: true
  })
  dataCadastro: Date;

  @Column({
    nullable: true
  })
  dataConclusao: Date;

  @ManyToOne(() => ClienteEntity, (cliente) => cliente.pedidos, { nullable: true })
  cliente?: ClienteEntity;

  @OneToMany(() => ItemEntity, (item) => item.pedido)
  itens?: ItemEntity[];

  constructor(pedido?: Pedido) {
    this.id = pedido?.id;

    this.itens = pedido?.itens?.map(i => new ItemEntity(i, this));
    this.statusId = StatusPedidoMapper.mapper(pedido?.getStatus());

    if (pedido?.temCliente()) {
      this.cliente = new ClienteEntity(pedido?.getCliente());
    }
  }

  public getDomain(): Pedido {
    return new Pedido(this.id, this.statusId);
  }
}