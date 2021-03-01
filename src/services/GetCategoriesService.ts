import axios, { AxiosResponse } from 'axios';
import Category from '../models/Category';

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
      throw Error('Tivemos um problema, tente novamente mais tarde');
    }

    this.categories = resCategoria.data.filter(
      category => category.Hierarquia.length === 4,
    );

    if (!this.categories) {
      throw Error('Nenhuma categoria encontrada');
    }

    return this.categories;
  }
}

export default GetCategoriesService;
