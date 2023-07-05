import { PagamentoDto } from "../../../../../pagamento/core/dto/PagamentoDto";
import { PedidoEntity } from "../../../../../pedido/adapter/driven/repositories/entities/PedidoEntity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";


@Entity("Pagamento")
export class PagamentoEntity {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column({
    nullable: false
  })
  public codigoPagamento?: string;


  @ManyToOne(() => PedidoEntity, (pedido) => pedido.pagamentos, {eager: true})
  pedido?: PedidoEntity;

  static getInstancia(pagamento: PagamentoDto): PagamentoEntity {
    const pagamentoEntity = new PagamentoEntity();
    pagamentoEntity.id = pagamento.id;
    pagamentoEntity.codigoPagamento = pagamento.getIdentificadorPagamentoExterno();
    pagamentoEntity.pedido = { id: pagamento.getPedido()?.id } as PedidoEntity;

    return pagamentoEntity;
  }

}
