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

              const response = await axios.request(config);

              console.log("AAA");
              console.log(response);
              console.log("BBB");

              if(response.status === 200) {
                //PEGAR RESPONSE BODY
                /*
                data: {
                    id: 1,
                    nome: 'Any Cliente Name',
                    cpf: '11111111111',
                    email: 'teste@mail.com'
                } 
                */
              } else if(response.status === 404) {
                //Verificar code
                //Cliente não encontrado - retornar Optional vazio
              } else {
                //Erro inesperado, lançar exceção
              }

              return Promise.resolve(Optional.empty());
        } catch (e) {
            this.logger.error(e);
            throw new ErrorToAccessDatabaseException();//FIXME: mudar para exceção especifica
        }
    }
}