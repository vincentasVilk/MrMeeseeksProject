"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.installMeeseeksRoutes = void 0;
const mr_meeseeks_controller_1 = require("../controllers/mr-meeseeks-controller");
const meeseeks_resource_1 = require("../resources/meeseeks-resource");
const installMeeseeksRoutes = (app) => {
    app.get('/meeseeks', {
        schema: {
            response: {
                200: meeseeks_resource_1.MRMEESEEKS_LIST_RESPONSE_OK,
            },
        },
    }, mr_meeseeks_controller_1.meeseeksAllHandler);
};
exports.installMeeseeksRoutes = installMeeseeksRoutes;
//# sourceMappingURL=meeseeks-routes.js.map