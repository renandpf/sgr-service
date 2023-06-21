import { Pedido } from "../../../../core/domain/Pedido";
import { Description, Enum, Example, Property } from "@tsed/schema";
import { StatusPedido } from "../../../../core/domain/StatusPedido";
import { StatusPedidoEnumMapper } from "../../../../core/domain/StatusPedidoEnumMapper";
import { OnSerialize } from "@tsed/json-mapper";

export class PedidoEmAndamentoJson {
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

    @Description("Data e hora do cadastro")
    @Example("2001-10-15 13:40:55")
    @Property()
    public readonly dataCadastro?: Date;

    @Description("Tempo de espera em minutos")
    @Example("100")
    @Property()
    public readonly tempoExpera?: number;

    constructor(pedido: Pedido) {
        this.id = pedido.id;
        this.observacao = pedido.observacao;
        this.clienteId = pedido.getCliente()?.id;
        this.status = pedido.getStatus();
        this.dataCadastro = pedido.getDataCadastro();
        this.tempoExpera = pedido.getTempoEspera();
    }
}