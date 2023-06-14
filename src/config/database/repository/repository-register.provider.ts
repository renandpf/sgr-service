import {registerProvider} from "@tsed/di";
import {MysqlDataSource} from "../MysqlDataSource";
import {ProdutoEntity} from "../../../gerencial/adapter/driven/repositories/entity/ProdutoEntity";

export const ProdutoDatabaseRepository = MysqlDataSource.getRepository(ProdutoEntity);
export const PRODUTO_DATABASE_REPOSITORY = Symbol.for("ProdutoDatabaseRepository");
export type PRODUTO_DATABASE_REPOSITORY = typeof ProdutoDatabaseRepository;

registerProvider({
  provide: PRODUTO_DATABASE_REPOSITORY,
  useValue: ProdutoDatabaseRepository
});