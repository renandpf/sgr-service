import { CartaoCreditoDto } from "../../../pagamento";

export class RequestPagamentoDto {
    //TODO: definir campos
    constructor(readonly cartoesCredito?: CartaoCreditoDto[]) {

    }
}