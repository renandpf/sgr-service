import { Inject } from "@tsed/di";
import { IClienteRepositoryGateway } from "../../ports";
import { Cliente } from "../../../domain";
import { Service } from "@tsed/common";
import { ClienteMySqlRepositoryGateway } from "../../../../adapter";
import { Optional } from "typescript-optional";

@Service()
export class CriarClienteUseCase {

    constructor( @Inject(ClienteMySqlRepositoryGateway) private clienteRepositoryGateway: IClienteRepositoryGateway ){}
    async criar(clienteReq: Cliente): Promise<Cliente> {

        let clienteOp: Optional<Cliente> = Optional.empty();
        
        if(clienteReq.cpf !== undefined){
            clienteOp = await this.clienteRepositoryGateway.obterPorCpf(clienteReq.cpf);
        }

        if (!clienteOp.isEmpty()) {
            throw new Error('TODO: Exceptions');
        }

        // TODO: Implementar validações de negócio

        return await this.clienteRepositoryGateway.criar(clienteReq);
    }

}