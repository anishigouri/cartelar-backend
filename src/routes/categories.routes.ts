import { Router } from 'express';
import GetCategoriesService from '../services/GetCategoriesService';

const categoriesRouter = Router();

categoriesRouter.get('/', async (request, response) => {
  try {
    const getCategories = new GetCategoriesService();
    return response.json(await getCategories.execute());
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

export default categoriesRouter;
