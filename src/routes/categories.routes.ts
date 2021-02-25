import { Router } from 'express';
import axios, { AxiosResponse } from 'axios';
import Category from '../models/Category';

const categoriesRouter = Router();

categoriesRouter.get('/', async (request, response) => {
  let resCategoria: AxiosResponse<Category[]> | null = null;
  try {
    resCategoria = await axios.get<Category[]>(
      'http://api.sigecloud.com.br/request/Categoria/Get',
      {
        headers: {
          'Authorization-Token': process.env.TOKEN_SIGECLOUD,
          user: process.env.EMAIL_SIGECLOUD,
          App: process.env.EMAIL_SIGECLOUD,
        },
      },
    );
  } catch (err) {
    console.error(err);
    return response.status(500).json({
      message: 'Tivemos um problema, tente novamente mais tarde',
    });
  }

  const categories = resCategoria.data.filter(
    category => category.Hierarquia.length === 4,
  );

  if (!categories) {
    return response
      .status(400)
      .json({ message: 'Nenhuma categoria encontrada' });
  }

  return response.json(categories);
});

export default categoriesRouter;
