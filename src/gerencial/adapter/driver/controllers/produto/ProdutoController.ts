import { Controller } from "@tsed/di";
import { Delete, Get, Post, Put, Returns } from "@tsed/schema";
import { BodyParams, Inject, PathParams } from "@tsed/common";
import {
  IAlterarProdutoUseCase,
  ICriarProdutoUseCase,
  IExcluirProdutoUseCase,
  IObterProdutoUseCase
} from "../../../../core/application";
import { ProdutoJson } from "./json/ProdutoJson";

@Controller("")
export class ProdutoController {

  constructor(
    @Inject(IObterProdutoUseCase) private obterProdutoUseCase: IObterProdutoUseCase,
    @Inject(ICriarProdutoUseCase) private criarProdutoUseCase: ICriarProdutoUseCase,
    @Inject(IAlterarProdutoUseCase) private alterarProdutoUseCase: IAlterarProdutoUseCase,
    @Inject(IExcluirProdutoUseCase) private excluirProdutoUseCase: IExcluirProdutoUseCase,
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
    return await this.criarProdutoUseCase.criar(produtoJson.getDomain(null)) + "";
  }

  @Put("/produtos/:id")
  @Returns(200).Description("Nenhuma resposta")
  async alterar(@PathParams("id") id: number, @BodyParams() produtoJson: ProdutoJson): Promise<void> {
    return await this.alterarProdutoUseCase.alterar(produtoJson.getDomain(id));
  }

  @Delete("/produtos/:id")
  @Returns(200).Description("Nenhuma resposta")
  async excluir(@PathParams("id") id: number): Promise<void> {
    return await this.excluirProdutoUseCase.excluir(id);
  }
}