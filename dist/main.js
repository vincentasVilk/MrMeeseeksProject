"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const mongoose_1 = require("mongoose");
const app_1 = require("./app");
const config_1 = require("./config");
const start = async () => {
    await (0, mongoose_1.connect)(config_1.CONFIG.db);
    await app_1.app.listen(config_1.CONFIG.port, '0.0.0.0');
};
start();
//# sourceMappingURL=main.js.map