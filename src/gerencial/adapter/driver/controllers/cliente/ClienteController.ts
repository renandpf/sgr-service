import { Controller } from "@tsed/di";
import { BodyParams, Inject, Logger, PathParams } from "@tsed/common";
import { Get, Post, Put, Returns } from "@tsed/schema";
import {
  IAlterarClienteUseCase,
  ICriarClienteUseCase,
  IObterClienteUseCase
} from "../../../../core/application";
import { ClienteJson } from "./json/ClienteJson";
import { AlterarClienteParamsDto } from "../../../../core/dto/cliente/flows/AlterarClienteParamsDto";
import { CriarClienteParamsDto } from "../../../../core/dto/cliente/flows/CriarClienteParamsDto";
import { CriarClienteReturnDto } from "../../../../core/dto/cliente/flows/CriarClienteReturnDto";

@Controller("/clientes")
export class ClienteController {
  constructor(
    @Inject(IObterClienteUseCase) private obterClienteUseCase: IObterClienteUseCase,
    @Inject(ICriarClienteUseCase) private criarClienteUseCase: ICriarClienteUseCase,
    @Inject(IAlterarClienteUseCase) private alterarClienteUseCase: IAlterarClienteUseCase,
    @Inject() private logger: Logger,
  ) {
  }
  @Get("/cpf/:cpf")
  @Returns(200, ClienteJson)
  @Returns(404).Description("Not found")
  async obterPorCpf(@PathParams("cpf") cpf: string) {
    this.logger.trace("Start cpf={}", cpf);
    const cliente = await this.obterClienteUseCase.obterPorCpf(cpf);
    const clientJson = new ClienteJson(cliente);
    this.logger.trace("End clientJson={}", clientJson);
    return clientJson;
  }

  @Get("/email/:email")
  @Returns(200, ClienteJson)
  @Returns(404).Description("Not found")
  async obterPorEmail(@PathParams("email") email: string) {
    const cliente = await this.obterClienteUseCase.obterPorEmail(email);

    return new ClienteJson(cliente);
  }

  @Get("/:id")
  @Returns(200, ClienteJson)
  @Returns(404).Description("Not found")
  async obterPorId(@PathParams("id") id: number) {
    const cliente = await this.obterClienteUseCase.obterPorId(id);
    return new ClienteJson(cliente);
  }

  @Post("/")
  @Returns(201, ClienteJson)
  @Returns(404).Description("Not found")
  async criarCliente(@BodyParams() cliente: ClienteJson) {
    this.logger.trace("Start cliente={}", cliente);
    const returnDto = await this.criarClienteUseCase.criar(new CriarClienteParamsDto(cliente.getDto()));
    this.logger.trace("End clienteId={}", returnDto.clienteId);
    cliente.id = returnDto.clienteId;
    return cliente;
  }

  @Put("/:id")
  @Returns(200)
  @Returns(404).Description("Not found")
  async alterarCliente(@BodyParams() clienteJson: ClienteJson, @PathParams("id") id: number){
    this.logger.trace("Start cliente={}, id={}", clienteJson, id);
    await this.alterarClienteUseCase.alterar(new AlterarClienteParamsDto(clienteJson.getDto(id)));
    this.logger.trace("End");
  }

}