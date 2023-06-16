import { Inject, Service } from "@tsed/common";
import { Cliente } from "src/gerencial/core/domain/Cliente";
import { ClienteNaoEncontradoException } from "../exceptions/ClienteNaoEncontradoException";
import { ClienteMySqlRepositoryGateway } from "src/pedido/adapter/driven/repositories/ClienteMySqlRepositoryGateway";
import { IClienteRepositoryGateway } from "../ports/IClienteRepositoryGateway";

@Service()
export class ObterClienteUseCase {
    constructor( @Inject(ClienteMySqlRepositoryGateway) private clienteRepositoryGateway: IClienteRepositoryGateway ){}

    async obterPorId(id: number): Promise<Cliente> {
        //TODO: colocar logs
        const clienteOp = await this.clienteRepositoryGateway.obterPorId(id);
        if(clienteOp.isEmpty()) {
            throw new ClienteNaoEncontradoException();
        }
        return clienteOp.get();
    }
}