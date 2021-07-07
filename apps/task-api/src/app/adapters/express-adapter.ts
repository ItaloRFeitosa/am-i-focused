import { Request, Response } from 'express';
import { HttpController } from '../../controllers/http/ports';

export const adaptExpress = (controller: HttpController) => {
  return async (req: Request, res: Response) => {
    const { headers, body, query, params } = req;

    const controllerParams = {
      body: { ...body, ...query, ...params },
      meta: headers,
    };

    const response = await controller.handle(controllerParams);

    return res.status(response.code).json(response.body);
  };
};
