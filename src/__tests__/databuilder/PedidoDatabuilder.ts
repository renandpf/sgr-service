import { faker } from "@faker-js/faker";

export const anyPedidoItemJson = {
    quantidade: faker.number.int(),
    produtoId: faker.number.int()
};

export const anyPedidoJson = {
    itens: [anyPedidoItemJson],
    observacao: faker.string.alpha(),
    clienteId: faker.number.int(),
};

