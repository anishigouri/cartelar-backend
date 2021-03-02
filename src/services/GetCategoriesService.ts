import axios, { AxiosResponse } from 'axios';
import AppError from '@errors/AppError';
import Category from '@entities/Category';

class GetCategoriesService {
  private categories: Category[];

  constructor() {
    // Instanciar o repositório quando tiver
    this.categories = [];
  }

  public async execute(): Promise<Category[]> {
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
      throw new AppError(
        'Tivemos um problema, tente novamente mais tarde',
        401,
      );
    }

    this.categories = resCategoria.data.filter(
      category => category.Hierarquia.length === 4,
    );

    if (!this.categories) {
      throw new AppError('Nenhuma categoria encontrada', 401);
    }

    return this.categories;
  }
}

export default GetCategoriesService;
