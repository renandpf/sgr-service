import { Pedido } from "../../../../core/domain/Pedido";
import { Item } from "src/pedido/core/domain/Item";
import { CollectionOf, Description, Enum, Example, Property } from "@tsed/schema";
import { StatusPedido } from "../../../../core/domain/StatusPedido";
import { StatusPedidoEnumMapper } from "../../../../core/domain/StatusPedidoEnumMapper";
import { OnSerialize } from "@tsed/json-mapper";

export class PedidoItemConsultaJson {
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

export class PedidoConsultaJson {
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
    @Enum("AGUARDANDO_PAGAMENTO", "RECEBIDO", "PREPARANDO", "PRONTO", "FINALIZADO")
    @OnSerialize((c: StatusPedido) => StatusPedidoEnumMapper.enumParaString(c))
    public readonly status?: StatusPedido;

    @Description("Itens do Pedido")
    @CollectionOf(PedidoItemConsultaJson)
    public readonly itens: PedidoItemConsultaJson[];

    static getInstance(pedido: Pedido): PedidoConsultaJson  {
        return {
            id: pedido.id,
            observacao: pedido.observacao,
            clienteId: pedido.cliente?.id,
            status: pedido.status,
            itens: pedido.itens?.map(i => PedidoConsultaJson.getItemInstance(i))
        } as PedidoConsultaJson;
    }

    private static getItemInstance(item: Item) : PedidoItemConsultaJson{
        return {
            id: item.id,
            produtoId: item.produto?.id,
            quantidade: item.quantidade,
            valorUnitario: item.valorUnitario,
            valorTotal: item.valorTotal
        }
    }
}
