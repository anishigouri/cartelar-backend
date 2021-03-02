import GetCategoriesService from '@services/GetCategoriesService';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

export default class CategoriesController {
  public async getCategories(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const getCategories = container.resolve(GetCategoriesService);
    return response.json(await getCategories.execute());
  }
}
