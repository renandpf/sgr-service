import { CartaoCredito } from "src/pagamento/core/domain/CartaoCredito";

export class RequestPagamentoDto {
    //TODO: definir campos
    constructor(readonly cartoesCredito?: CartaoCredito[]){

    }
}