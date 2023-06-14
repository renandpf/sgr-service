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


    @Post("/produtos")
    @Returns(200).Description("ID do pedido criado")
    async criar(@BodyParams() pedidoJson: PedidoJson): Promise<string> {
      return "IMPLEMENTAR";
    }
  
}