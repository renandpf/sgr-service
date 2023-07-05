import { ClienteEntity } from "../../../../../gerencial/adapter/driven/repositories/entities";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { PedidoItemEntity } from "./PedidoItemEntity";
import { StatusPedidoEnumMapper } from "../../../../core/domain/StatusPedidoEnumMapper";
import { PagamentoEntity } from "../../../../../pagamento/adapter/driven/repositories/entities/PagamentoEntity";
import { PedidoDto } from "../../../../core/dtos/PedidoDto";

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
  //@JoinColumn()
  cliente?: ClienteEntity;

  @OneToMany(() => PedidoItemEntity, (item) => item.pedido)
  //@JoinTable()
  itens?: PedidoItemEntity[];

  @OneToMany(() => PagamentoEntity, (pagamento) => pagamento.pedido)
  pagamentos?: PagamentoEntity[];

  constructor(pedidoDto?: PedidoDto) {
    if(pedidoDto){
      this.id = pedidoDto.id;
      this.observaco = pedidoDto.observacao;
      this.dataCadastro = pedidoDto.dataCadastro as never;
      this.dataConclusao = pedidoDto.dataConclusao;
      this.itens = pedidoDto.itens?.map(i => new PedidoItemEntity(i, this));
      const status = pedidoDto.status;
      if (status !== undefined) {
        this.statusId = StatusPedidoEnumMapper.enumParaNumber(status);
      }

      if (pedidoDto?.cliente) {
        this.cliente = new ClienteEntity(pedidoDto?.cliente);
      }
    }
  }

  public getDto(): PedidoDto {

    const itens = this.itens?.map(i => i.getDto());

    return new PedidoDto(
      StatusPedidoEnumMapper.numberParaEnum(this.statusId),
      this.dataCadastro,
      itens,
      this.observaco,
      this.cliente?.getClientDto(),
      this.dataConclusao,
      this.id
      // TODO adicionar pagamento
    );
  }
}