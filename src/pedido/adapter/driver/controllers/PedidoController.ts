import { BodyParams, Inject, Logger, PathParams } from "@tsed/common";
import { Post, Put, Returns } from "@tsed/schema";
import { Controller } from "@tsed/di";
import { CriarPedidoUseCase } from "../../../core/application/useCases/CriarPedidoUseCase";
import { AtualizarStatusPedidoUseCase } from "../../../core/application/useCases/AtualizarStatusPedidoUseCase";
import { PedidoJson } from "./json/PedidoJson";

@Controller("")
export class PedidoController {

    constructor(
        @Inject() private criarPedidoUseCase: CriarPedidoUseCase,
        @Inject() private atualizarStatusPedidoUseCase: AtualizarStatusPedidoUseCase,
        @Inject() private logger: Logger) {
    }


    @Post("/pedidos")
    @Returns(201).Description("ID do pedido criado")
    async criar(@BodyParams() pedidoJson: PedidoJson): Promise<string> {
        this.logger.info("Start pedidoJson={}", pedidoJson);
        const pedidoId = await this.criarPedidoUseCase.criar(pedidoJson.getDomain());
        this.logger.trace("End pedidoId={}", pedidoId);
        return `${pedidoId}`;
    }

    @Put("/pedidos/:id")
    @Returns(200).Description("Nenhuma resposta")
    async atualizar(@PathParams("id") id: number): Promise<void> {
        //TODO implementar
        Promise.resolve(15);
        await this.atualizarStatusPedidoUseCase.atualizarStatus(id);
    }

}