import { faker } from "@faker-js/faker";

export const anyPedidoJson = {
    idsRefeicao: [faker.number.int()],
    idsAcompanhamento: [faker.number.int()],
    idsBebida: [faker.number.int()],
    idsSobremesa: [faker.number.int()],
    observacao: faker.string.alpha(),
    clienteId: faker.number.int(),
};