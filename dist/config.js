"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CONFIG = void 0;
require("dotenv/config");
exports.CONFIG = {
    port: Number(process.env.APP_PORT) || 4000,
    db: process.env.DB_CONNECTION || '',
    fastifyConfig: { logger: Boolean(process.env.DEBUG) ? false : true },
};
//# sourceMappingURL=config.js.map