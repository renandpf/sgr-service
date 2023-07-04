import { Inject } from "@tsed/di";
import { IClienteRepositoryGateway } from "../../ports";
import { Cliente } from "../../../domain/Cliente";
import { Service, Logger } from "@tsed/common";
import { ClienteMySqlRepositoryGateway } from "../../../../adapter";
import { ClienteExistenteException } from "../../exception/ClienteExistenteException";
import { ICriarClienteUseCase } from "./ICriarClienteUseCase";
import { CriarClienteParamsDto } from "../../../dto/cliente/flows/CriarClienteParamsDto";
import { CriarClienteReturnDto } from "../../../dto/cliente/flows/CriarClienteReturnDto";
import { ClienteDto } from "../../../dto/cliente/ClienteDto";


@Service()
export class CriarClienteUseCase implements ICriarClienteUseCase {

    constructor( 
        @Inject(ClienteMySqlRepositoryGateway) private clienteRepositoryGateway: IClienteRepositoryGateway,
        @Inject() private logger: Logger  ){}
    async criar(dto: CriarClienteParamsDto): Promise<CriarClienteReturnDto> {
        this.logger.trace("Start dto={}", dto);

        const clienteReq = this.mapDtoToDomain(dto.cliente);

        clienteReq.validar();

        const clienteOp = await this.clienteRepositoryGateway.obterPorCpf(<string>clienteReq.cpf);

        if (!clienteOp.isEmpty()) {
            this.logger.warn("Cliente já existe no sistema.")
            throw new ClienteExistenteException();
        }

        const returnDto = await this.clienteRepositoryGateway.criar(dto);

        this.logger.trace("End returnDto={}", returnDto);
        return returnDto;
    }

    private mapDtoToDomain(dto: ClienteDto): Cliente {
        return new Cliente(dto.id, dto.nome, dto.cpf, dto.email);
    }

}