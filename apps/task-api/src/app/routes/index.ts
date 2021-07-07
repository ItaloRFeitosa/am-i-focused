import { Router } from 'express';

import { DependencyContainer } from 'tsyringe';
import { HttpController } from '../../controllers/http/ports';
import { adaptExpress } from '../adapters/express-adapter';

export const makeRoutes = (container: DependencyContainer) => {
  const router = Router();

  router.get('/health', (_, res) => res.json({message: 'it works!'}))

  router.post(
    '/tasks',
    adaptExpress(container.resolve<HttpController>('CreateTaskController'))
  );
  router.post(
    '/tasks/:id/focus',
    adaptExpress(container.resolve<HttpController>('FocusTaskController'))
  );
  router.post(
    '/tasks/:id/pause',
    adaptExpress(container.resolve<HttpController>('PauseTaskController'))
  );
  router.get(
    '/tasks/:id',
    adaptExpress(container.resolve<HttpController>('GetTaskController'))
  );

  return router;
};
