import { Request, Response } from 'express';
import IController from './ControllerInterface';
import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

class OpenAiController implements IController {
  index(req: Request, res: Response): Response {
    return res.status(200).json({ message: 'Hello' });
  }

  async store(req: Request, res: Response): Promise<Response<any, Record<string, any>>> {
    try {
      const { prompt } = req.body;

      if (!prompt) {
        throw Error('Prompt field is required!');
      }

      const response = await openai.createCompletion({
        model: 'text-davinci-003',
        prompt,
        temperature: 0,
        max_tokens: 3000,
        top_p: 1,
        frequency_penalty: 0.5,
        presence_penalty: 0,
      });

      return res.status(200).json({ bot: response.data.choices[0].text });
    } catch (err: any) {
      return res.status(500).json({
        message: err.message || 'Something went wrong',
      });
    }
  }
}

export default new OpenAiController();
