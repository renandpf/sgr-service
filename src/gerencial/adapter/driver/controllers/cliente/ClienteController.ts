import { Controller } from "@tsed/di";
import { Get, Post, Returns } from "@tsed/schema";
import { BodyParams, Inject, QueryParams } from "@tsed/common";
import {
  CriarCLienteDTO,
  CriarClienteDTOResult,
  CriarClienteUseCase,
  ObterClienteUseCase,
  CLienteDTOResult
} from "../../../../core/application";

@Controller("/cliente")
export class ClienteController {

  constructor(
    @Inject() private obterClienteUseCase: ObterClienteUseCase,
    @Inject() private criarClienteUseCase: CriarClienteUseCase
  ) {
  }
  @Get("/")
  @Returns(200, CLienteDTOResult)
  @Returns(404).Description("Not found")
  async obterPorCpf(@QueryParams("cpf") cpf: string) {
    return await this.obterClienteUseCase.obterPorCpf(cpf)
  }

  @Post("/")
  @Returns(200, CriarClienteDTOResult)
  @Returns(404).Description("Not found")
  async criarCliente(@BodyParams() cliente: CriarCLienteDTO){
    return await this.criarClienteUseCase.criar(cliente);
  }

}