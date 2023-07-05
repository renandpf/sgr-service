import { ClienteDto } from "../ClienteDto";

export class CriarClienteParamsDto {
    constructor(readonly cliente: ClienteDto) {}
}