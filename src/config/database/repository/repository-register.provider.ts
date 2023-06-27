import { registerProvider } from "@tsed/di";
import { MysqlDataSource } from "../MysqlDataSource";
import { ProdutoEntity } from "../../../gerencial/adapter/driven/repositories/entities/ProdutoEntity";
import { PedidoEntity } from "src/pedido/adapter/driven/repositories/entities/PedidoEntity";
import { ClienteEntity } from "src/gerencial/adapter/driven/repositories/entities/ClienteEntity";
import { ItemEntity } from "src/pedido/adapter/driven/repositories/entities/ItemEntity";
import { PagamentoEntity } from "src/pagamento/adapter/driven/repositories/entities/PagamentoEntity";

export const ProdutoDatabaseRepository = MysqlDataSource.getRepository(ProdutoEntity);
export const PRODUTO_DATABASE_REPOSITORY = Symbol.for("ProdutoDatabaseRepository");
export type PRODUTO_DATABASE_REPOSITORY = typeof ProdutoDatabaseRepository;
registerProvider({
  provide: PRODUTO_DATABASE_REPOSITORY,
  useValue: ProdutoDatabaseRepository
});

export const ClienteDatabaseRepository = MysqlDataSource.getRepository(ClienteEntity);
export const CLIENTE_DATABASE_REPOSITORY = Symbol.for("ClienteDatabaseRepository");
export type CLIENTE_DATABASE_REPOSITORY = typeof ClienteDatabaseRepository;
registerProvider({
  provide: CLIENTE_DATABASE_REPOSITORY,
  useValue: ClienteDatabaseRepository
});

export const PedidoDatabaseRepository = MysqlDataSource.getRepository(PedidoEntity);
export const PEDIDO_DATABASE_REPOSITORY = Symbol.for("PedidoDatabaseRepository");
export type PEDIDO_DATABASE_REPOSITORY = typeof PedidoDatabaseRepository;
registerProvider({
  provide: PEDIDO_DATABASE_REPOSITORY,
  useValue: PedidoDatabaseRepository
});

export const ItemDatabaseRepository = MysqlDataSource.getRepository(ItemEntity);
export const ITEM_DATABASE_REPOSITORY = Symbol.for("ItemDatabaseRepository");
export type ITEM_DATABASE_REPOSITORY = typeof ItemDatabaseRepository;
registerProvider({
  provide: ITEM_DATABASE_REPOSITORY,
  useValue: ItemDatabaseRepository
});

export const PagamentoDatabaseRepository = MysqlDataSource.getRepository(PagamentoEntity);
export const PAGAMENTO_DATABASE_REPOSITORY = Symbol.for("PagamentoDatabaseRepository");
export type PAGAMENTO_DATABASE_REPOSITORY = typeof PagamentoDatabaseRepository;
registerProvider({
  provide: PAGAMENTO_DATABASE_REPOSITORY,
  useValue: PagamentoDatabaseRepository
});