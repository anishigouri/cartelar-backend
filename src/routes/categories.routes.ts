import { Router } from 'express';

const categoriesRouter = Router();

categoriesRouter.get('/', (request, response) => {
  return response.json({ message: 'oioi' });
});

export default categoriesRouter;
