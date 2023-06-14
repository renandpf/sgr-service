import { Service } from "@tsed/common";
import { CriarPedidoDto } from "../dto/CriarPedidoDto";

@Service()
export class CriarPedidoUseCase {
    
    public criar(dto: CriarPedidoDto): Promise<number> {
        //TODO: implementar
        return Promise.resolve(15);
    }

}