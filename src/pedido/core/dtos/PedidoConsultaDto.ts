import { PedidoItem, Pedido, StatusPedido, StatusPedidoEnumMapper } from "../domain";
import { CollectionOf, Description, Enum, Example, Property } from "@tsed/schema";
import { OnSerialize } from "@tsed/json-mapper";
import { PedidoDto, PedidoItemDto } from "./PedidoDto";

export class PedidoItemConsultaDto {
    @Description("Identificador")
    @Example("123456")
    @Property()
    public readonly id?: number;

    @Description("Quantidade do Item")
    @Example("5")
    @Property()
    public quantidade?: number;

    @Description("Valor Unitário do Item")
    @Example("5.6")
    @Property()
    public valorUnitario?: number;

    @Description("Valor Total do Item")
    @Example("5.6")
    @Property()
    public valorTotal?: number;

    @Description("Identificador do Produto")
    @Example("123456")
    @Property()
    public produtoId?: number
}

export class PedidoConsultaDto {
    @Description("Identificador")
    @Example("123456")
    @Property()
    public readonly id?: number;

    @Description("Observação")
    @Example("Sem cebola")
    @Property()
    public readonly observacao?: string;

    @Description("Cliente")
    @Example("123456")
    @Property()
    public readonly clienteId?: number;

    @Description("Categoria")
    @Example("RECEBIDO")
    @Enum("RECEBIDO", "AGUARDANDO_CONFIRMACAO_PAGAMENTO", "PAGO", "EM_PREPARACAO", "PRONTO", "FINALIZADO", "PAGAMENTO_INVALIDO")
    @OnSerialize((c: StatusPedido) => StatusPedidoEnumMapper.enumParaString(c))
    public readonly status?: StatusPedido;

    @Description("Itens do Pedido")
    @CollectionOf(PedidoItemConsultaDto)
    public readonly itens: PedidoItemConsultaDto[];

    static getInstance(pedido: PedidoDto): PedidoConsultaDto {
        return {
            id: pedido.id,
            observacao: pedido.observacao,
            clienteId: pedido.cliente?.id,
            status: pedido.status,
            itens: pedido.itens?.map(i => PedidoConsultaDto.getItemInstance(i))
        } as PedidoConsultaDto;
    }

    private static getItemInstance(item: PedidoItemDto): PedidoItemConsultaDto {
        return {
            id: item.id,
            produtoId: item.produto?.id,
            quantidade: item.quantidade,
            valorUnitario: item.valorUnitario,
            valorTotal: item.valorTotal
        }
    }
}
