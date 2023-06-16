import { Inject, Logger, } from "@tsed/common";
import { Service } from "@tsed/di";
import { Pagamento } from "../../domain/Pagamento";
import { ObterPedidoUseCase } from "./ObterPedidoUseCase";

@Service()
export class EfetuarPagamentoUseCase {

    constructor(
        @Inject() private logger: Logger,
        @Inject() private obterPedidoUseCase: ObterPedidoUseCase,
        ) {
    }

    async efetuar(pagamento: Pagamento){
        this.logger.trace("Start pagamento={}", pagamento);

        //TODO: implementar: obter pedido, verificar status do pedido, chamar api de pagamento, alterar status do pedido e salvar no database

        this.logger.trace("End");
    }
}