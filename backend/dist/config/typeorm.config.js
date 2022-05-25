"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.typeOrmConfig = void 0;
exports.typeOrmConfig = {
    type: 'postgres',
    host: 'localhost',
    port: 5434,
    username: 'postgres',
    password: 'postgres',
    database: 'workouter',
    entities: [__dirname + '/../**/*.model{.ts,.js}'],
    synchronize: true,
};
//# sourceMappingURL=typeorm.config.js.map