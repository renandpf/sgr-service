import { CollectionOf, Description, Example, Property } from "@tsed/schema";

export class PedidoItemCadastroDto {

    @Description("Qauntidade do Produto")
    @Example("5")
    @Property()
    public quantidade?: number;

    @Description("Identificador do Produto")
    @Example("123456")
    @Property()
    public produtoId?: number
}

export class PedidoCadastroDto {

    @Description("Observação")
    @Example("Sem cebola")
    @Property()
    public readonly observacao?: string;

    @Description("Cliente")
    @Example("123456")
    @Property()
    public readonly clienteId?: number;

    @Description("Itens do Pedido")
    @CollectionOf(PedidoItemCadastroDto)
    public readonly itens: PedidoItemCadastroDto[];
}
