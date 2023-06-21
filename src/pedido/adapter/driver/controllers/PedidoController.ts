import { BodyParams, Inject, Logger, PathParams } from "@tsed/common";
import { Get, Post, Put, Returns } from "@tsed/schema";
import { Controller } from "@tsed/di";
import { CriarPedidoUseCase } from "../../../core/application/useCases/CriarPedidoUseCase";
import { AtualizarStatusPedidoUseCase } from "../../../core/application/useCases/AtualizarStatusPedidoUseCase";
import { PedidoJson } from "./json/PedidoJson";
import { ObterPedidoUseCase } from "src/pedido/core/application/useCases/ObterPedidoUseCase";

@Controller("")
export class PedidoController {

    constructor(
        @Inject() private obterPedidoUseCase: ObterPedidoUseCase,
        @Inject() private criarPedidoUseCase: CriarPedidoUseCase,
        @Inject() private atualizarStatusPedidoUseCase: AtualizarStatusPedidoUseCase,
        @Inject() private logger: Logger) {
    }

    @Get("/pedidos/:id")
    @Returns(200).Description("Pedido")
    async obterPorId(@PathParams("id") id: number): Promise<PedidoJson> {
        this.logger.info("Start pedidoId={}", id);
        const pedido = await this.obterPedidoUseCase.obterPorId(id);
        const pedidoJson = new PedidoJson(pedido);
        this.logger.trace("End pedidoJson={}", pedidoJson);
        return pedidoJson;
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
    async atualizarStatus(@PathParams("id") id: number): Promise<void> {
        this.logger.info("Start pedidoId={}", id);
        await this.atualizarStatusPedidoUseCase.atualizarStatus(id);
        this.logger.trace("End pedidoId={}", id);
    }

}