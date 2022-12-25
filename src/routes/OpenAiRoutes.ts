import OpenAiController from '../controllers/OpenAiController';
import BaseRoutes from './BaseRoutes';

class OpenAiRoutes extends BaseRoutes {
  public routes(): void {
    this.router.get('/', OpenAiController.index);
    this.router.post('/', OpenAiController.store);
  }
}

export default new OpenAiRoutes().router;
