import express, { Application } from 'express';
import bodyParser from 'body-parser';
import compression from 'compression';
import helmet from 'helmet';
import morgan from 'morgan';
import cors from 'cors';
import 'dotenv/config';

// ROUTES
import OpenAiRoutes from './routes/OpenAiRoutes';

class App {
  public app: Application;

  constructor() {
    this.app = express();
    this.plugins();
    this.routes();
  }

  protected plugins(): void {
    this.app.use(express.json());
    this.app.use(morgan('dev'));
    this.app.use(bodyParser.json({ limit: '30mb' }));
    this.app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }));
    this.app.use(compression());
    this.app.use(helmet());
    this.app.use(cors());
  }

  protected routes(): void {
    this.app.use('/api/v1/openai', OpenAiRoutes);
  }
}

const PORT = process.env.PORT || 5000;
const app = new App().app;
app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
