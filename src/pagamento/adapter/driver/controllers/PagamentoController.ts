import { BodyParams, Inject, Logger } from "@tsed/common";
import { Post, Returns } from "@tsed/schema";
import { Controller } from "@tsed/di";
import { IConfirmarPagamentoUseCase, IEfetuarPagamentoUseCase } from "../../../core/application";

import { PagamentoJson } from "./json/PagamentoJson";
import { ConfirmacaoPagamentoJson } from "./json/ConfirmacaoPagamentoJson";

@Controller("")
export class PagamentoController {

    constructor(
        @Inject(IEfetuarPagamentoUseCase) private efetuarPagamentoUseCase: IEfetuarPagamentoUseCase,
        @Inject(IConfirmarPagamentoUseCase) private confirmarPagamentoUseCase: IConfirmarPagamentoUseCase,
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

    @Post("/pagamentos/confirmar")
    @Returns(200)
    async confirmar(@BodyParams() confirmacaoPagamentoJson: ConfirmacaoPagamentoJson): Promise<void> {
        this.logger.info("Start confirmacaoPagamentoJson={}", confirmacaoPagamentoJson);

        //fixme: Esta chamada deve ser async
        await this.confirmarPagamentoUseCase.confirmar(confirmacaoPagamentoJson.identificador, confirmacaoPagamentoJson.status);
        this.logger.trace("End");
    }
}