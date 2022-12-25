"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const openai_1 = require("openai");
const configuration = new openai_1.Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});
const openai = new openai_1.OpenAIApi(configuration);
class OpenAiController {
    index(req, res) {
        return res.status(200).json({ message: 'Hello' });
    }
    store(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { prompt } = req.body;
                if (!prompt) {
                    throw Error('Prompt field is required!');
                }
                const response = yield openai.createCompletion({
                    model: 'text-davinci-003',
                    prompt,
                    temperature: 0,
                    max_tokens: 3000,
                    top_p: 1,
                    frequency_penalty: 0.5,
                    presence_penalty: 0,
                });
                return res.status(200).json({ bot: response.data.choices[0].text });
            }
            catch (err) {
                return res.status(500).json({
                    message: err.message || 'Something went wrong',
                });
            }
        });
    }
}
exports.default = new OpenAiController();
