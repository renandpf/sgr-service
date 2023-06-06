import { Controller } from "@tsed/di";
import { Get, Post, Put, Returns } from "@tsed/schema";
import { BodyParams, Inject, PathParams } from "@tsed/common";

import { CategoriaEnum, Produto } from "src/gerencial/core/domain";
import { ObterProdutoUseCase } from "src/gerencial/core/application/useCases/produtoUseCases/ObterProdutoUseCase";
import { CriarProdutoUseCase } from "src/gerencial/core/application/useCases/produtoUseCases/CriarProdutoUseCase";
import { ProdutoJson } from "./json/ProdutoJson";
import { AlterarProdutoUseCase } from "src/gerencial/core/application/useCases/produtoUseCases/AlterarProdutoUseCase";

@Controller("sgr")
export class ProdutoController {

  constructor(
    @Inject() private obterProdutoUseCase: ObterProdutoUseCase,
    @Inject() private criarProdutoUseCase: CriarProdutoUseCase,
    @Inject() private alterarProdutoUseCase: AlterarProdutoUseCase,
  ) {
  }
  @Get("categorias/{categoria}/produtos")
  @Returns(200, Array<ProdutoJson>)
  async obterPorCategoria(@PathParams("categoria") categoria: CategoriaEnum): Promise<ProdutoJson[]> {//TODO: testar se enum funciona aqui
   const produtos = await this.obterProdutoUseCase.obterPorCategoria(categoria);
   return produtos.map(p => new ProdutoJson(p));
  }

  @Get("produtos/{id}")
  @Returns(200, ProdutoJson)
  async obter(@PathParams("id") id: number): Promise<ProdutoJson> {
   const produto = await this.obterProdutoUseCase.obterPorId(id);
   return new ProdutoJson(produto);
  }


  @Post("/produtos")
  @Returns(200).Description("ID do produto criado")
  async criar(@BodyParams() produtoJson: ProdutoJson): Promise<number>{
    return await this.criarProdutoUseCase.criar(produtoJson.getDomain());
  }

  @Put("/produtos/{id}")
  @Returns(200).Description("Nenhuma resposta")
  async alterar(@PathParams() id: number, @BodyParams() produtoJson: ProdutoJson): Promise<void>{
    return await this.alterarProdutoUseCase.alterar(produtoJson.getDomain(id));
  }
}