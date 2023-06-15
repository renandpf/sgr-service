import { faker } from "@faker-js/faker";

import { PagamentoJson } from "../../pedido/adapter/driver/controllers/json/PagamentoJson";

export const anyPedidoJson = {
    idsRefeicao: [faker.number.int()],
    idsAcompanhamento: [faker.number.int()],
    idsBebida: [faker.number.int()],
    idsSobremesa: [faker.number.int()],
    observacao: faker.string.alpha(),
    clienteId: faker.number.int(),
    pagamento: new PagamentoJson(),
};