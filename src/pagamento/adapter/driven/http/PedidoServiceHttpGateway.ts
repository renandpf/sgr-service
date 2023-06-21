import { Logger, Service } from "@tsed/common";
import { Inject } from "@tsed/di";
import { Optional } from "typescript-optional";
import axios from "axios";
import { IPedidoServiceGateway } from "src/pagamento/core/application/ports/IPedidoServiceGateway";
import { Pedido, StatusPedido } from "src/pedido";
import { ErrorToAccessPedidoServiceException } from "src/pagamento/core/application/exceptions/ErrorToAccessPedidoServiceException";

@Service()
export class PedidoServiceHttpGateway implements IPedidoServiceGateway {
    @Inject()
    private logger: Logger;
    private readonly clientServiceUrlBase: string = "http://localhost:8083";//FIXME: usar arquivo properties

    async obterPorId(id: number): Promise<Optional<Pedido>> {
        try {
          this.logger.trace("Start id={}", id);
          
          const pedidoOp: Optional<Pedido> = await this.callService(id);

          this.logger.trace("End pedidoOp={}", pedidoOp);
          return pedidoOp;
        } catch (e) {
            this.logger.error(e);
            throw new ErrorToAccessPedidoServiceException();
        }
    }

  private async callService(id: number): Promise<Optional<Pedido>>  {
    try {

      const config = {
        method: "get",
        maxBodyLength: Infinity,
        url: `${this.clientServiceUrlBase}/pedido/pedidos/${id}`,
        headers: { }
      };

      this.logger.info("Try connect pedidoService. config={}", config);

      const response = await axios.request(config);
      this.logger.info("response={}", response);
      
      return this.processSucessResponse(response);

    } catch (error) {
      return this.processErrorResponse(error, id);
    }
  }

  private processSucessResponse(response: any): Optional<Pedido> {
    if (response.status === 200) {
      return this.getClientFromResponse(response);
    } else {
      this.logger.warn("Erro ao acessar cliente service");
      throw Error("Erro ao acessar cliente service");
    }
  }

  private processErrorResponse(error: any, id: number): Optional<Pedido> {
    if (error.response.status === 404 && error.response.data.code === "sgr.pedidoNotFound") {
      this.logger.warn("Pedido não encontrado. id={}", id);
      return Optional.empty();
    } else {
      this.logger.warn("Erro ao acessar pedido service");
      throw error;
    }
  }


  private getClientFromResponse(response: any): Optional<Pedido> {
    const id = response.data.id;
    const status = StatusPedido[response.data.status] as unknown as number;

    const pedido = new Pedido(id, status);

    return Optional.of(pedido);
  }
}