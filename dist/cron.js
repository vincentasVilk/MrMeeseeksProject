"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const config_1 = require("./config");
const meesseeks_service_1 = require("./domain/service/meesseeks-service");
const start = async () => {
    try {
        await mongoose_1.default.connect(config_1.CONFIG.db);
        await (0, meesseeks_service_1.doWork)();
        process.exit(0);
    }
    catch (error) {
        console.log(error);
        process.exit(1);
    }
};
start();
//# sourceMappingURL=cron.js.map