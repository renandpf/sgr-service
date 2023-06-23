import { Inject, Service } from "@tsed/di";
import { Logger } from "@tsed/common";
import { ErrorToAccessDatabaseException } from "src/common/exception/ErrorToAccessDatabaseException";
import { PAGAMENTO_DATABASE_REPOSITORY } from "src/config/database/repository/repository-register.provider";
import { IPagamentoRepositoryGateway } from "src/pagamento/core/application/ports/IPagamentoRepositoryGateway";
import { Pagamento } from "src/pagamento/core/domain/Pagamento";
import { PagamentoEntity } from "./entities/PagamentoEntity";

@Service()
export class PagamentoMySqlRepositoryGateway implements IPagamentoRepositoryGateway {
    @Inject()
    logger: Logger;

    @Inject(PAGAMENTO_DATABASE_REPOSITORY)
    protected pagamentoRepository: PAGAMENTO_DATABASE_REPOSITORY;

    async criar(pagamento: Pagamento): Promise<number | undefined> {
        try {
            this.logger.trace("Start pagamento={}", pagamento);

            const pagamentoEntityCreated = await this.pagamentoRepository.save(PagamentoEntity.getInstancia(pagamento));
            const pagamentoEntityCreatedId = pagamentoEntityCreated.id;

            this.logger.trace("End pagamentoEntityCreatedId={}", pagamentoEntityCreatedId);
            return pagamentoEntityCreatedId;
        }
        catch (e) {
            console.log(e);
            this.logger.error(e);
            throw new ErrorToAccessDatabaseException();
        }

    }
}