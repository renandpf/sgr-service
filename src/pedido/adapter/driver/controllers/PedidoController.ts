import { BodyParams, Inject, Logger } from "@tsed/common";
import { Post, Returns  } from "@tsed/schema";
import { Controller } from "@tsed/di";
import { CriarPedidoUseCase } from "../../../core/application/useCases/CriarPedidoUseCase";
import { PedidoJson } from "./json/PedidoJson";

@Controller("")
export class PedidoController{

    constructor(
        @Inject() private criarPedidoUseCase: CriarPedidoUseCase,
        @Inject() private logger: Logger){
    }


    @Post("/pedidos")
    @Returns(201).Description("ID do pedido criado")
    async criar(@BodyParams() pedidoJson: PedidoJson): Promise<string> {
        this.logger.trace("Start pedidoJson={}", pedidoJson);
        const pedidoId = await this.criarPedidoUseCase.criar(pedidoJson.getCriarPedidoDto());
        this.logger.trace("End pedidoId={}", pedidoId);
      return `${pedidoId}`;
    }
  
}