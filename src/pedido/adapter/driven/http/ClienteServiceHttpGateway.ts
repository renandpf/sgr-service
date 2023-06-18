import { Logger, Service } from "@tsed/common";
import { Inject } from "@tsed/di";
import { Optional } from "typescript-optional";
import { ErrorToAccessDatabaseException } from "../../../../common/exception/ErrorToAccessDatabaseException";
import { IClienteServiceGateway } from "src/pedido/core/application/ports/IClienteServiceGateway";
import { Cliente } from "src/gerencial/core/domain/Cliente";
import axios from "axios";

@Service()
export class ClienteServiceHttpGateway implements IClienteServiceGateway {
    @Inject()
    private logger: Logger;
    private readonly clientServiceUrlBase: string = "http://localhost:8083";

    async obterPorId(id: number): Promise<Optional<Cliente>> {
        try {
          
          const config = {
            method: "get",
            maxBodyLength: Infinity,
            url: `${this.clientServiceUrlBase}/gerencial/clientes/${id}`,
            headers: { }
          };

          this.logger.info("Try connect ClienteService. config={}", config);

          let clienteOp: Optional<Cliente> = Optional.empty();
          let response = undefined;
          try {
            response = await axios.request(config);

            this.logger.info("response={}", response);
  
            if(response.status === 200) {
  
              const id = response.data.id;
              const nome = response.data.nome;
              const cpf = response.data.cpf;
              const email = response.data.email;
  
              const cliente = new Cliente(id, nome, cpf, email);
  
              clienteOp = Optional.of(cliente);
            } else {
              this.logger.warn("Erro ao acessar cliente service");
              throw Error("Erro ao acessar cliente service");
            }

          } catch (error) {
             if(error.response.status === 404 && error.response.data.name === "sgr.clienteNaoEncontrado") {
                this.logger.warn("Cliente não encontrado. id={}", id);
            } else {
              this.logger.warn("Erro ao acessar cliente service");
              throw error;
            }
          }

          this.logger.trace("End clienteOp={}", clienteOp);
          return clienteOp;
        } catch (e) {
            this.logger.error(e);
            throw new ErrorToAccessDatabaseException();//FIXME: mudar para exceção especifica
        }
    }
}