import { Inject } from "@tsed/common";
import { IClienteRepositoryGateway } from "../../../ports/ClienteRepositoryGateway";
import { Cliente } from "src/gerencial/core/domain/Cliente";

export class ObterProdutoUseCase implements IClienteRepositoryGateway {

    constructor( @Inject() private produtoRepositoryGateway: IClienteRepositoryGateway ){}
    obterById(id: number): Promise<Cliente> {
        return this.produtoRepositoryGateway.obterById(id);
    }
    obterByCpf(cpf: string): Promise<Cliente> {
        return this.produtoRepositoryGateway.obterByCpf(cpf);
    }
    obterByEmail(email: string): Promise<Cliente> {
        return this.produtoRepositoryGateway.obterByEmail(email);
    }

}