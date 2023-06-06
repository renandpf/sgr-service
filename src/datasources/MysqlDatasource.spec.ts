import { PlatformTest } from "@tsed/common";

describe("MysqlDatasource", () => {
  beforeEach(PlatformTest.create);
  afterEach(PlatformTest.reset);

  it("should do something", () => {
    //const instance = PlatformTest.get<MysqlDataSource>(MysqlDataSource);
    // const instance = PlatformTest.invoke<MysqlDatasource>(MysqlDatasource); // get fresh instance

    //expect(instance).toBeInstanceOf(MysqlDatasource);
  });
});
