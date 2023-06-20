import { Inject, Service } from "@tsed/di";
import { Logger } from "@tsed/common";
import { Optional } from "typescript-optional";

import { IProdutoServiceGateway } from "src/pedido/core/application/ports/IProdutoServiceGateway";
import { Produto } from "src/gerencial";
import axios from "axios";
import { ErrorToAccessProdutoServiceException } from "src/pedido/core/application/exceptions/ErrorToAccessProdutoServiceException";

@Service()
export class ProdutoServiceHttpGateway implements IProdutoServiceGateway {
    @Inject()
    private logger: Logger;
    private readonly clientServiceUrlBase: string = "http://localhost:8083";

    async obterPorId(id: number): Promise<Optional<Produto>> {
        try {
          this.logger.trace("Start id={}", id);
          
          const produtoOp: Optional<Produto> = await this.callService(id);

          this.logger.trace("End produtoOp={}", produtoOp);
          return produtoOp;
        } catch (e) {
            this.logger.error(e);
            throw new ErrorToAccessProdutoServiceException();
        }
    }

  private async callService(id: number): Promise<Optional<Produto>>  {
    try {

      const config = {
        method: "get",
        maxBodyLength: Infinity,
        url: `${this.clientServiceUrlBase}/gerencial/produtos/${id}`,
        headers: { }
      };

      this.logger.info("Try connect produtoService. config={}", config);

      const response = await axios.request(config);
      this.logger.info("response={}", response);
      
      return this.processSucessResponse(response);

    } catch (error) {
      return this.processErrorResponse(error, id);
    }
  }

  private processSucessResponse(response: any): Optional<Produto> {
    if (response.status === 200) {
      return this.getProdutoFromResponse(response);
    } else {
      this.logger.warn("Erro ao acessar cliente service");
      throw Error("Erro ao acessar cliente service");
    }
  }

  private processErrorResponse(error: any, id: number): Optional<Produto> {
    if (error.response.status === 404 && error.response.data.code === "sgr.produtoNotFound") {
      this.logger.warn("Produto não encontrado. id={}", id);
      return Optional.empty();
    } else {
      this.logger.warn("Erro ao acessar cliente service");
      throw error;
    }
  }


  private getProdutoFromResponse(response: any): Optional<Produto> {
    const id = response.data.id;
    const nome = response.data.nome;
    const descricao = response.data.descricao;
    const valor = response.data.valor;
    const categoria = response.data.categoria;
    const imagem = undefined;

    const produto = new Produto(id, nome, descricao, valor, categoria, imagem);

    return Optional.of(produto);
  }
}