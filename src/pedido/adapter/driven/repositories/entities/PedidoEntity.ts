import { ClienteEntity } from "src/gerencial/adapter/driven/repositories/entities";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { ItemEntity } from "./ItemEntity";
import { Pedido } from "src/pedido/core/domain/Pedido";
import { StatusPedidoEnumMapper } from "../../../../core/domain/StatusPedidoEnumMapper";

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
  dataConclusao?: Date;

  @Column({
    nullable: true
  })
  observaco?: string;

  @ManyToOne(() => ClienteEntity, (cliente) => cliente.pedidos, { nullable: true })
  cliente?: ClienteEntity;

  @OneToMany(() => ItemEntity, (item) => item.pedido)
  itens?: ItemEntity[];

  constructor(pedido?: Pedido) {
    this.id = pedido?.id;
    this.observaco = pedido?.observacao;
    this.dataCadastro = pedido?.getDataCadastro() as never;
    this.dataConclusao = pedido?.getDataConclusao();
    this.itens = pedido?.itens?.map(i => new ItemEntity(i, this));
    const status = pedido?.getStatus();
    if(status !== undefined){
      this.statusId = StatusPedidoEnumMapper.enumParaNumber(status);
    }

    if (pedido?.temCliente()) {
      this.cliente = new ClienteEntity(pedido?.getCliente());
    }
  }

  public getDomain(): Pedido {
    return new Pedido(this.id, this.statusId);
  }
}