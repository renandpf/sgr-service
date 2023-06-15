import { Service } from "@tsed/common";

@Service()
export class AtualizarStatusPedidoUseCase {

    public atualizarStatusPreparando(pedidoId: number): Promise<number> {
        //TODO: implementar
        return Promise.resolve(15);
    }
}