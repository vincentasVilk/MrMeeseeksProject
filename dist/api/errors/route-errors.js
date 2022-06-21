"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.assignStatus = exports.installErrorHandler = void 0;
const error_resources_1 = require("../resources/error-resources");
const installErrorHandler = (app) => {
    app.setErrorHandler(async (err, req, res) => {
        if (err.validation) {
            res.status(400).send(error_resources_1.formatError);
            return;
        }
        if (err.statusCode) {
            res.status(err.statusCode).send(error_resources_1.formatError);
            return;
        }
        res.status(500).send(error_resources_1.formatError);
    });
    app.setNotFoundHandler(async (_req, res) => {
        res
            .status(404)
            .send((0, error_resources_1.formatError)({ code: '404', name: 'routeNotFound', statusCode: 404, message: 'No such route' }));
    });
};
exports.installErrorHandler = installErrorHandler;
const assignStatus = (error, type, statusCode) => {
    if (error instanceof type) {
        Object.assign(error, { statusCode });
    }
};
exports.assignStatus = assignStatus;
//# sourceMappingURL=route-errors.js.map