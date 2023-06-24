import { BodyParams, Inject, Logger } from "@tsed/common";
import { Post, Returns } from "@tsed/schema";
import { Controller } from "@tsed/di";
import { PagamentoJson } from "src/pedido/adapter/driver/controllers/json/PagamentoJson";
import { EfetuarPagamentoUseCase } from "src/pagamento/core/application/usecases/EfetuarPagamentoUseCase";

@Controller("")
export class PagamentoController {

    constructor(
        @Inject() private efetuarPagamentoUseCase: EfetuarPagamentoUseCase,
        @Inject() private logger: Logger) {
    }

    @Post("/pagamentos/efetuar")
    @Returns(200)
    async efetuar(@BodyParams() pagamentoJson: PagamentoJson): Promise<string | undefined> {
        this.logger.info("Start pagamentoJson={}", pagamentoJson);
        const pagamentoId = await this.efetuarPagamentoUseCase.efetuar(pagamentoJson.getDomain());
        this.logger.trace("End pagamentoId={}", pagamentoId);
        return `${pagamentoId}`;
    }
}