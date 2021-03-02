import { Router } from 'express';
import categoriesRouter from './categories.route';
import usersRouter from './users.route';
import sessionsRouter from './sessions.route';

const routes = Router();

routes.use('/categories', categoriesRouter);
routes.use('/users', usersRouter);
routes.use('/sessions', sessionsRouter);

export default routes;
