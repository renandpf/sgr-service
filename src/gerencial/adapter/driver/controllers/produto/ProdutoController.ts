import { Controller } from "@tsed/di";
import { Get, Post, Returns, number } from "@tsed/schema";
import { BodyParams, Inject, PathParams, QueryParams } from "@tsed/common";

import { CategoriaEnum, Produto } from "src/gerencial/core/domain";
import { ObterProdutoUseCase } from "src/gerencial/core/application/useCases/produtoUseCases/ObterProdutoUseCase";
import { CriarProdutoUseCase } from "src/gerencial/core/application/useCases/produtoUseCases/CriarProdutoUseCase";
import { ProdutoJson } from "./json/ProdutoJson";

@Controller("sgr")
export class ProdutoController {

  constructor(
    @Inject() private obterProdutoUseCase: ObterProdutoUseCase,
    @Inject() private criarProdutoUseCase: CriarProdutoUseCase,
  ) {
  }
  @Get("categorias/{categoria}/produtos")
  @Returns(200, Array<Produto>)
  async obterPorCategoria(@PathParams("categoria") categoria: CategoriaEnum): Promise<ProdutoJson[]> {//TODO: testar se enum funciona aqui
   const produtos = await this.obterProdutoUseCase.obterPorCategoria(categoria);
   return Promise.resolve(produtos.map(p => new ProdutoJson(p)));
  }

  @Post("/")
  @Returns(200).Description("ID do produto criado")
  async criarCliente(@BodyParams() produto: ProdutoJson){
    return await this.criarProdutoUseCase.criar(produto.getDomain());
  }

}