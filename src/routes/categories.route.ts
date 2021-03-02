import { Router } from 'express';
import CategoriesController from 'controllers/CategoriesController';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const categoriesRouter = Router();
const categoriesController = new CategoriesController();

categoriesRouter.use(ensureAuthenticated);

categoriesRouter.get('/', categoriesController.getCategories);

export default categoriesRouter;
