"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const compression_1 = __importDefault(require("compression"));
const helmet_1 = __importDefault(require("helmet"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
require("dotenv/config");
// ROUTES
const OpenAiRoutes_1 = __importDefault(require("./routes/OpenAiRoutes"));
class App {
    constructor() {
        this.app = (0, express_1.default)();
        this.plugins();
        this.routes();
    }
    plugins() {
        this.app.use(express_1.default.json());
        this.app.use((0, morgan_1.default)('dev'));
        this.app.use(body_parser_1.default.json({ limit: '30mb' }));
        this.app.use(body_parser_1.default.urlencoded({ limit: '30mb', extended: true }));
        this.app.use((0, compression_1.default)());
        this.app.use((0, helmet_1.default)());
        this.app.use((0, cors_1.default)());
    }
    routes() {
        this.app.use('/api/v1/openai', OpenAiRoutes_1.default);
    }
}
const PORT = process.env.PORT || 5000;
const app = new App().app;
app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
