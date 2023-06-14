import { CriarPedidoDto } from "src/pedido/core/application/dto/CriarPedidoDto";
import { PagamentoJson } from "./PagamentoJson";

export class PedidoJson {
    public readonly idsRefeicao: number[];
    public readonly idsAcompanhamento: number[];
    public readonly idsBebida: number[];
    public readonly idsSobremesa: number[];
    public readonly observacao: string;

    public readonly clienteId: number;

    public readonly pagamento: PagamentoJson;

    public getCriarPedidoDto(): CriarPedidoDto {
        //TODO: implementar
        return new CriarPedidoDto();
    }
}