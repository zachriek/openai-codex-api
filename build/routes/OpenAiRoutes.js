"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const OpenAiController_1 = __importDefault(require("../controllers/OpenAiController"));
const BaseRoutes_1 = __importDefault(require("./BaseRoutes"));
class OpenAiRoutes extends BaseRoutes_1.default {
    routes() {
        this.router.get('/', OpenAiController_1.default.index);
        this.router.post('/', OpenAiController_1.default.store);
    }
}
exports.default = new OpenAiRoutes().router;
