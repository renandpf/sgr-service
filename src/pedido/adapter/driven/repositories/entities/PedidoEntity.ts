import { ClienteEntity } from "src/gerencial/adapter/driven/repositories/entities";
import { Column, Entity, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { ItemEntity } from "./ItemEntity";
import { Pedido } from "src/pedido/core/domain/Pedido";
import { StatusPedidoEnumMapper } from "../../../../core/domain/StatusPedidoEnumMapper";
import { PagamentoEntity } from "src/pagamento/adapter/driven/repositories/entities/PagamentoEntity";

@Entity("Pedido")
export class PedidoEntity {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column({
    nullable: false
  })
  statusId: number;

  @Column({
    nullable: false
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

  @OneToOne(() => PagamentoEntity, (pagamento) => pagamento.pedido)
  pagamento?: PagamentoEntity;

  constructor(pedido?: Pedido) {
    this.id = pedido?.id;
    this.observaco = pedido?.observacao;
    this.dataCadastro = pedido?.dataCadastro as never;
    this.dataConclusao = pedido?.dataConclusao;
    this.itens = pedido?.itens?.map(i => new ItemEntity(i, this));
    const status = pedido?.status;
    if(status !== undefined){
      this.statusId = StatusPedidoEnumMapper.enumParaNumber(status);
    }

    if (pedido?.temCliente()) {
      this.cliente = new ClienteEntity(pedido?.cliente);
    }
  }

  public getDomain(): Pedido {

    const itens = this.itens?.map(i => i.getDomain());

    return new Pedido(
        this.id,
        this.cliente?.getDomain(),
        this.observaco,
        StatusPedidoEnumMapper.numberParaEnum(this.statusId),
        this.dataCadastro,
        this.dataConclusao,
        itens,
        // TODO adicionar pagamento
    );
  }
}