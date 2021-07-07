import { created } from '../http-presenters';
import { HttpController, HttpRequest } from '../ports';

type CreatedTaskResult = {
  name: string;
  createdAt: string;
  userId: string;
};

type CreateTaskDTO = {
  name: string;
};

export class CreateTaskController implements HttpController<CreateTaskDTO> {
  constructor (
    private readonly createTaskFeature: any
  ){}
  async handle(params: HttpRequest<CreateTaskDTO>) {
    const createdTask: CreatedTaskResult = await this.createTaskFeature.exec(params.body)
    return created<CreatedTaskResult>(createdTask);
  }
}
