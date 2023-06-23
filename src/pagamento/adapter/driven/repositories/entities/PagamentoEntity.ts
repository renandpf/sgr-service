import { Pagamento } from "src/pagamento/core/domain/Pagamento";
import { PedidoEntity } from "src/pedido/adapter/driven/repositories/entities/PedidoEntity";
import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";


@Entity("Pagamento")
export class PagamentoEntity {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column({
    nullable: false
  })
  codigoPagamento?: string;


  @OneToOne(() => PedidoEntity, (pedido) => pedido.pagamento)
  pedido?: PedidoEntity;

  // constructor(pagamento?: Pagamento){
  //   //this.pedido = new PedidoEntity(pagamento?.getPedido());
  //   this.pedido = {id: pagamento?.id} as PedidoEntity;
  //   this.codigoPagamento = pagamento?.getIdentificadorPagamentoExterno();
  // }

  static getInstancia(pagamento: Pagamento): PagamentoEntity{
    const pagamentoEntity = new PagamentoEntity();
    pagamentoEntity.id = pagamento.id;
    pagamentoEntity.codigoPagamento = pagamento.getIdentificadorPagamentoExterno();
    pagamentoEntity.pedido = {id: pagamento.id} as PedidoEntity;

    return pagamentoEntity;
  }

}
