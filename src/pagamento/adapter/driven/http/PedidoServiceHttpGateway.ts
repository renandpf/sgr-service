import { Logger, Service } from "@tsed/common";
import { Inject } from "@tsed/di";
import { Optional } from "typescript-optional";
import axios from "axios";
import { IPedidoServiceGateway } from "src/pagamento/core/application/ports/IPedidoServiceGateway";
import { Pedido, StatusPedido, StatusPedidoEnumMapper } from "src/pedido";
import { ErrorToAccessPedidoServiceException } from "src/pagamento/core/application/exceptions/ErrorToAccessPedidoServiceException";

@Service()
export class PedidoServiceHttpGateway implements IPedidoServiceGateway {
    @Inject()
    private logger: Logger;
    private readonly clientServiceUrlBase: string = "http://localhost:8083";//FIXME: usar arquivo properties

  async obterPorId(id: number): Promise<Optional<Pedido>> {
      try {
        this.logger.trace("Start id={}", id);
        
        const pedidoOp: Optional<Pedido> = await this.callGetByIdService(id);

        this.logger.trace("End pedidoOp={}", pedidoOp);
        return pedidoOp;
      } catch (e) {
          this.logger.error(e);
          throw new ErrorToAccessPedidoServiceException();
      }
  }

  async alterarStatus(pedido: Pedido): Promise<void> {
    try {
      this.logger.trace("Start pedido={}", pedido);
      
      await this.callChangeStatusService(pedido);

      this.logger.trace("End");
    } catch (e) {
        this.logger.error(e);
        throw new ErrorToAccessPedidoServiceException();
    }

  }

  private async callChangeStatusService(pedido: Pedido): Promise<void>  {
    try {

      const config = {
        headers: { },
      };

      const body = {
        status: StatusPedidoEnumMapper.enumParaString(pedido.getStatus()),
      };

      this.logger.info("Try connect pedidoService. config={}, method=patch, body={}", config, body);

      const response = await axios.patch(`${this.clientServiceUrlBase}/pedido/pedidos/${pedido.id}/status`, body, config)
      this.logger.info("response={}", response);
      
      this.processSucessResponse(response);

    } catch (error) {
      this.processErrorResponse(error);
    }
  }


  private async callGetByIdService(id: number): Promise<Optional<Pedido>>  {
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
      return this.processErrorResponse(error);
    }
  }

  private processSucessResponse(response: any): Optional<Pedido> {
    if (response.status === 200) {
      if(response.request.method === 'GET'){
        return this.getClientFromResponse(response);
      }

      if(response.request.method === 'PATCH'){
        return Optional.empty();
      }
      this.logger.warn("Request method unexpected")
      return Optional.empty();
    } else {
      this.logger.warn("Erro ao acessar cliente service");
      throw Error("Erro ao acessar cliente service");
    }
  }

  private processErrorResponse(error: any): Optional<Pedido> {
    if (error.response.status === 404 && error.response.data.code === "sgr.pedidoNotFound") {
      this.logger.warn("Pedido não encontrado");
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