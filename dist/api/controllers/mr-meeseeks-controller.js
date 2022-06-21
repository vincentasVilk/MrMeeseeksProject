"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.meeseeksAllHandler = void 0;
const http2_1 = require("http2");
const mr_meeseeks_dao_1 = require("../../persistance/mr-meeseeks-dao");
const meeseeks_resource_1 = require("../resources/meeseeks-resource");
const meeseeksAllHandler = async (req, res) => {
    const data = await (0, mr_meeseeks_dao_1.getAllMeeseeks)();
    res.status(http2_1.constants.HTTP_STATUS_OK).send((0, meeseeks_resource_1.mrMesseeksFormatList)(data));
};
exports.meeseeksAllHandler = meeseeksAllHandler;
//# sourceMappingURL=mr-meeseeks-controller.js.map