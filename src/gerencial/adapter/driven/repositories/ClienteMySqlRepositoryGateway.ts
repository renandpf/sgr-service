import { IClienteRepositoryGateway } from "../../../core/application/ports";
import { Cliente } from "../../../core/domain";
import { Logger, Service } from "@tsed/common";
import { Inject } from "@tsed/di";
import { In } from "typeorm";
import { Optional } from "typescript-optional";
import { ClienteEntity } from "./entities";
import { CLIENTE_DATABASE_REPOSITORY } from "../../../../config/database/repository/repository-register.provider";
import { ErrorToAccessDatabaseException } from "../../../../common/exception/ErrorToAccessDatabaseException";
import { AlterarClienteParamsDto } from "../../../core/dto/cliente/flows/AlterarClienteParamsDto";
import { AlterarClienteReturnDto } from "../../../core/dto/cliente/flows/AlterarClienteReturnDto";
import { CriarClienteParamsDto } from "../../../core/dto/cliente/flows/CriarClienteParamsDto";
import { CriarClienteReturnDto } from "../../../core/dto/cliente/flows/CriarClienteReturnDto";
import { ClienteDto } from "src/gerencial/core/dto/cliente/ClienteDto";


@Service()
export class ClienteMySqlRepositoryGateway implements IClienteRepositoryGateway{
    @Inject()
    logger: Logger;

    @Inject(CLIENTE_DATABASE_REPOSITORY)
    protected clienteRepository: CLIENTE_DATABASE_REPOSITORY;

    async alterar(dto: AlterarClienteParamsDto): Promise<AlterarClienteReturnDto> {
        try {
            this.logger.trace("Start dto={}", dto);
            await this.clienteRepository.save(new ClienteEntity(dto.cliente));
            const returnDto = new AlterarClienteReturnDto();
            this.logger.trace("End returnDto={}", returnDto);
            return returnDto;

        } catch (e) {
            this.logger.error(e);
            throw new ErrorToAccessDatabaseException();
        }
    }

    async criar(dto: CriarClienteParamsDto): Promise<CriarClienteReturnDto> {
        try {
            this.logger.trace("Start dto={}", dto);
            const clienteEntity = await this.clienteRepository.save(new ClienteEntity(dto.cliente));
            const returnDto = new CriarClienteReturnDto(clienteEntity.id as number);
            this.logger.trace("End returnDto={}", returnDto);
            return returnDto;
        } catch (e) {
            this.logger.error(e);
            throw new ErrorToAccessDatabaseException();
        }
    }

    async obterPorCpf(cpf: string): Promise<Optional<ClienteDto>> {
        try {
            this.logger.trace("Start cpf={}", cpf);
            const clienteEntity = await this.clienteRepository.findOneBy(
                {
                    cpf: In([cpf])
                });

            const clienteDtoOp = Optional.ofNullable(clienteEntity?.getClientDto());
            this.logger.trace("End clienteDtoOp={}", clienteDtoOp);
            return clienteDtoOp;
        } catch (e) {
            this.logger.error(e);
            throw new ErrorToAccessDatabaseException();
        }
    }

    async obterPorEmail(email: string): Promise<Optional<ClienteDto>> {
        try {
            this.logger.trace("Start email={}", email);
            const clienteEntity = await this.clienteRepository.findOneBy(
                {
                    email: In([email])
                });

            const clienteDtoOp = Optional.ofNullable(clienteEntity?.getClientDto());
            this.logger.trace("End clienteDtoOp={}", clienteDtoOp);
            return clienteDtoOp;
        } catch (e) {
            this.logger.error(e);
            throw new ErrorToAccessDatabaseException();
        }
    }

    async obterPorId(id: number): Promise<Optional<ClienteDto>> {
        try {
            this.logger.trace("Start id={}", id);
            const clienteEntity = await this.clienteRepository.findOneBy(
                {
                    id: In([id])
                });

            const clienteDtoOp = Optional.ofNullable(clienteEntity?.getClientDto());
            this.logger.trace("End clienteDtoOp={}", clienteDtoOp);
            return clienteDtoOp;
        } catch (e) {
            this.logger.error(e);
            throw new ErrorToAccessDatabaseException();
        }
    }
}