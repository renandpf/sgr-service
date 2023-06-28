import { Logger, Service } from "@tsed/common";
import { Inject } from "@tsed/di";
import { Optional } from "typescript-optional";
import { IClienteServiceGateway } from "../../../../pedido/core/application/ports/IClienteServiceGateway";
import { Cliente } from "../../../../gerencial/core/domain/Cliente";
import axios from "axios";
import { ErrorToAccessClienteServiceException } from "../../../../pedido/core/application/exceptions/ErrorToAccessClienteServiceException";

@Service()
export class ClienteServiceHttpGateway implements IClienteServiceGateway {
  @Inject()
  private logger: Logger;
  private readonly clientServiceUrlBase: string = "http://localhost:8083";//FIXME: usar arquivo properties

  async obterPorId(id: number): Promise<Optional<Cliente>> {
    try {
      this.logger.trace("Start id={}", id);

      const clienteOp: Optional<Cliente> = await this.callService(id);

      this.logger.trace("End clienteOp={}", clienteOp);
      return clienteOp;
    } catch (e) {
      this.logger.error(e);
      throw new ErrorToAccessClienteServiceException();
    }
  }

  private async callService(id: number): Promise<Optional<Cliente>> {
    try {

      const config = {
        method: "get",
        maxBodyLength: Infinity,
        url: `${this.clientServiceUrlBase}/gerencial/clientes/${id}`,
        headers: {}
      };

      this.logger.info("Try connect ClienteService. config={}", config);

      const response = await axios.request(config);
      this.logger.info("response={}", response);

      return this.processSucessResponse(response);

    } catch (error) {
      return this.processErrorResponse(error, id);
    }
  }

  private processSucessResponse(response: any): Optional<Cliente> {
    if (response.status === 200) {
      return this.getClientFromResponse(response);
    } else {
      this.logger.warn("Erro ao acessar cliente service");
      throw Error("Erro ao acessar cliente service");
    }
  }

  private processErrorResponse(error: any, id: number): Optional<Cliente> {
    if (error.response.status === 404 && error.response.data.code === "sgr.clienteNaoEncontrado") {
      this.logger.warn("Cliente não encontrado. id={}", id);
      return Optional.empty();
    } else {
      this.logger.warn("Erro ao acessar cliente service");
      throw error;
    }
  }


  private getClientFromResponse(response: any): Optional<Cliente> {
    const id = response.data.id;
    const nome = response.data.nome;
    const cpf = response.data.cpf;
    const email = response.data.email;

    const cliente = new Cliente(id, nome, cpf, email);

    return Optional.of(cliente);
  }
}