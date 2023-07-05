import { Controller } from "@tsed/di";
import { Delete, Get, Post, Put, Returns } from "@tsed/schema";
import { BodyParams, Inject, PathParams, Logger } from "@tsed/common";
import {
  IAlterarProdutoUseCase,
  ICriarProdutoUseCase,
  IExcluirProdutoUseCase,
  IObterProdutoUseCase
} from "../../../../core/application";
import { ProdutoJson } from "./json/ProdutoJson";
import { AlterarProdutoParamsDto } from "../../../../core/dto/produto/flows/AlterarProdutoParamsDto";
import { CriarProdutoParamsDto } from "src/gerencial/core/dto/produto/flows/CriarProdutoParamsDto";

@Controller("")
export class ProdutoController {

  constructor(
    @Inject(IObterProdutoUseCase) private obterProdutoUseCase: IObterProdutoUseCase,
    @Inject(ICriarProdutoUseCase) private criarProdutoUseCase: ICriarProdutoUseCase,
    @Inject(IAlterarProdutoUseCase) private alterarProdutoUseCase: IAlterarProdutoUseCase,
    @Inject(IExcluirProdutoUseCase) private excluirProdutoUseCase: IExcluirProdutoUseCase,
    @Inject() private logger: Logger,
  ) {
  }
  @Get("/categorias/:categoria/produtos")
  @Returns(200, Array<ProdutoJson>)
  async obterPorCategoria(@PathParams("categoria") categoria: string): Promise<ProdutoJson[]> {
    console.log(categoria);
    const produtos = await this.obterProdutoUseCase.obterPorCategoria(categoria);
    return produtos.map(p => new ProdutoJson(p));
  }

  @Get("/produtos/:id")
  @Returns(200, ProdutoJson)
  async obter(@PathParams("id") id: number): Promise<ProdutoJson> {
    const produto = await this.obterProdutoUseCase.obterPorId(id);
    return new ProdutoJson(produto);
  }

  @Post("/produtos")
  @Returns(201).Description("ID do produto criado")
  async criar(@BodyParams() produtoJson: ProdutoJson): Promise<string> {
    this.logger.trace("Start produtoJson={}", produtoJson);
    const returnDto = await this.criarProdutoUseCase.criar(new CriarProdutoParamsDto(produtoJson.getProdutoDto(null)));
    this.logger.trace("End id={}", returnDto.id);
    return `${returnDto.id}`;
  }

  @Put("/produtos/:id")
  @Returns(200).Description("Nenhuma resposta")
  async alterar(@PathParams("id") id: number, @BodyParams() produtoJson: ProdutoJson): Promise<void> {
    this.logger.trace("Start id={}, produtoJson={}", id, produtoJson);
    await this.alterarProdutoUseCase.alterar(new AlterarProdutoParamsDto(produtoJson.getProdutoDto(id)));
    this.logger.trace("End");
  }

  @Delete("/produtos/:id")
  @Returns(200).Description("Nenhuma resposta")
  async excluir(@PathParams("id") id: number): Promise<void> {
    return await this.excluirProdutoUseCase.excluir(id);
  }
}