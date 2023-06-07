import { Service } from "@tsed/di";
import { IProdutoRepositoryGateway } from "../../../core/application/ports/IProdutoRepositoryGateway";
import { Produto, CategoriaEnum } from "../../../core/domain";
import { Optional } from "typescript-optional";

@Service()
export class ProdutoMySqlRepositoryGateway implements IProdutoRepositoryGateway {
    excluir(id: number): Promise<void> {
        throw new Error("Method not implemented.");
    }
    obterPorId(id: number): Promise<Optional<Produto>> {
        throw new Error("Method not implemented.");
    }
    obterPorCategoria(categoria: CategoriaEnum): Promise<Produto[]> {
        throw new Error("Method not implemented.");
    }
    criar(produto: Produto): Promise<number> {
        throw new Error("Method not implemented.");
    }
    alterar(produto: Produto): Promise<void> {
        throw new Error("Method not implemented.");
    }

}