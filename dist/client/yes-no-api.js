"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.taskIsCompleted = exports.getResponse = void 0;
const node_fetch_1 = require("node-fetch");
const getResponse = async () => {
    const response = await (0, node_fetch_1.default)('https://yesno.wtf/api');
    const data = await response.json();
    return data;
};
exports.getResponse = getResponse;
const taskIsCompleted = async () => {
    const yesNoResponse = await (0, exports.getResponse)();
    return yesNoResponse.answer === 'yes';
};
exports.taskIsCompleted = taskIsCompleted;
//# sourceMappingURL=yes-no-api.js.map