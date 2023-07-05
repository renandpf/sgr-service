import { CartaoCreditoDto } from "src/pagamento/core/dto/CartaoCreditoDto";

export class RequestPagamentoDto {
    //TODO: definir campos
    constructor(readonly cartoesCredito?: CartaoCreditoDto[]) {

    }
}