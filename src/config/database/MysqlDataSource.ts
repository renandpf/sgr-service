import {registerProvider} from "@tsed/di";
import {DataSource} from "typeorm";
import {Logger} from "@tsed/logger";
import { ClienteEntity, ProdutoEntity } from "../../common";

export const MYSQL_DATA_SOURCE = Symbol.for("MySqlDataSource");
export const MysqlDataSource = new DataSource({
  // name: "default",  if you come from v0.2.x
  type: "mysql",
  entities: [ProdutoEntity, ClienteEntity], // add this to discover typeorm model
  host: "localhost",
  port: 3306,
  username: "root",
  password: "senha",
  database: "sgr_database",
  synchronize: false,
});

registerProvider<DataSource>({
  provide: MYSQL_DATA_SOURCE,
  type: "typeorm:datasource",
  deps: [Logger],
  async useAsyncFactory(logger: Logger) {
    await MysqlDataSource.initialize();

    logger.info("Connected with typeorm to database: MySQL");

    return MysqlDataSource;
  },
  hooks: {
    $onDestroy(dataSource) {
      return dataSource.isInitialized && dataSource.destroy();
    }
  }
});
