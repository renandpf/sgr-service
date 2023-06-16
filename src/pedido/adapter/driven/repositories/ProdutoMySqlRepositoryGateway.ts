import { Inject, Service } from "@tsed/di";

import { Logger } from "@tsed/common";

import { ErrorToAccessDatabaseException } from "src/common/exception/ErrorToAccessDatabaseException";
import { Optional } from "typescript-optional";
import { PRODUTO_DATABASE_REPOSITORY } from "src/config/database/repository/repository-register.provider";
import { IProdutoRepositoryGateway } from "src/pedido/core/application/ports/IProdutoRepositoryGateway";
import { Equal } from "typeorm";
import { Produto } from "src/gerencial/core/domain/Produto";

@Service()
export class ProdutoMySqlRepositoryGateway implements IProdutoRepositoryGateway {
    @Inject()
    logger: Logger;

    @Inject(PRODUTO_DATABASE_REPOSITORY)
    protected produtoRepository: PRODUTO_DATABASE_REPOSITORY;

    async obterPorId(produtoId: number): Promise<Optional<Produto>> {
        try {
            this.logger.trace("Start produtoId={}", produtoId)
            const produtoEntity = await this.produtoRepository.findOneBy({id: Equal(produtoId)});

            let produtoOp: Optional<Produto> = Optional.empty();
            if(produtoEntity !== null){
                produtoOp = Optional.of(produtoEntity.getDomain());
            }

            this.logger.trace("End produtoOp={}", produtoOp)
            return produtoOp;

        } catch (e) {
            this.logger.error(e);
            throw new ErrorToAccessDatabaseException();
        }
    }

}