import axios, { AxiosResponse } from 'axios';
import AppError from '@errors/AppError';
import Product from '@entities/Product';
import { container } from 'tsyringe';
import GetCategoriesService from './GetCategoriesService';

class ProductsService {
  private products: Product[];

  public async execute(type: string, category: string): Promise<Product[]> {
    const categoryService = container.resolve(GetCategoriesService);

    // Listando as categorias
    const categories = await categoryService.execute();

    // Listando os Produtos
    const { data } = await axios.get(
      `http://api.sigecloud.com.br/request/Produtos/GetAll?pageSize=5000`,
      {
        headers: {
          'Authorization-Token': process.env.TOKEN_SIGECLOUD,
          user: process.env.EMAIL_SIGECLOUD,
          App: process.env.EMAIL_SIGECLOUD,
        },
      },
    );

    // Separando produtos Granel/Cartela

    let listGranel = [];

    if (type === 'cartela') {
      listGranel = data.filter(
        (item: Product) =>
          item.Nome.toUpperCase().includes('CARTELA') &&
          !item.Nome.toUpperCase().includes('*CANCELADO'),
      );
    } else {
      listGranel = data.filter(
        (item: Product) =>
          !item.Nome.toUpperCase().includes('CARTELA') &&
          !item.Nome.toUpperCase().includes('*CANCELADO'),
      );
    }

    // Separando produto por categoria
    const products = listGranel.filter((item: Product) => {
      // Buscando a Hierarquia Pai do item do produto
      const objectCategory = categories.find(itemCategory => {
        return (
          itemCategory.Nome.trim().toUpperCase() ===
          item.Categoria.trim().toUpperCase()
        );
      });

      if (!objectCategory) {
        console.log('ERRO de categoria', item.Codigo, item.Categoria);
      }
      // Filtrando produtos apenas com a categoria passada por parâmetro
      if (
        objectCategory &&
        objectCategory.Hierarquia.substr(0, 4) === category
      ) {
        return item;
      }
    });

    const model = products.map(async item => {
      if (item.Codigo) {
        // Buscando o ID da imagem
        const imageId = await axios.get(
          `http://api.sigecloud.com.br/request/ProdutosFotos/GetImagensByProduto?codigoProduto=${item.Codigo}`,
          {
            headers: {
              'Authorization-Token': process.env.TOKEN_SIGECLOUD,
              user: process.env.EMAIL_SIGECLOUD,
              App: process.env.EMAIL_SIGECLOUD,
            },
          },
        );
        let image;
        // Buscando o base64 da imagem
        if (imageId.data[0]) {
          try {
            image = await axios.get(
              `http://api.sigecloud.com.br/request/ProdutosFotos/GetImagem?imagemId=${imageId.data[0].Id}&miniatura=true`,
              {
                headers: {
                  'Authorization-Token': process.env.TOKEN_SIGECLOUD,
                  user: process.env.EMAIL_SIGECLOUD,
                  App: process.env.EMAIL_SIGECLOUD,
                },
              },
            );
          } catch (err) {
            console.error(`Erro ao buscar imagem ${item.Codigo}`);
          }

          // Gravando o arquivo .webp no disco rígido
          try {
            const base64Data = `${image.data}`;
            await fs.writeFile(
              `${__dirname}/images/${imageId.data[0].Id}.webp`,
              base64Data,
              'base64',
            );
          } catch (err) {
            console.error(`Erro escrever imagem ${item.Codigo}`);
          }

          try {
            // Convertendo o arquivo para JPG
            const output_path = `${__dirname}/images/${imageId.data[0].Id}.jpeg`;
            await webp.dwebp(
              `${__dirname}/images/${imageId.data[0].Id}.webp`,
              output_path,
              '-o',
            );
            // Lendo o arquivo e convertendo para base64
            const imageBase64JPG = await imageToBase64(
              `${__dirname}/images/${imageId.data[0].Id}.jpeg`,
            );

            const cat = resCategoria.data.find(
              cat => cat.Hierarquia === category,
            );

            return {
              categoria: cat.Nome,
              produto: item.Nome,
              codigo: item.Codigo,
              preco:
                numberPercent > 0
                  ? item.PrecoCusto + (item.PrecoCusto * numberPercent) / 100
                  : item.PrecoVenda,
              imagemBase64: imageBase64JPG,
            };
          } catch (err) {
            console.error(
              `Erro ao pegar imagem base64 JPG ${item.Codigo}`,
              err,
            );
          }
        } else {
          console.log('SEM IMAGEM: ', item.Codigo);
          const cat = resCategoria.data.find(
            cat => cat.Hierarquia === category,
          );
          return {
            categoria: cat.Nome,
            produto: item.Nome,
            codigo: item.Codigo,
            preco:
              numberPercent > 0
                ? item.PrecoCusto + (item.PrecoCusto * numberPercent) / 100
                : item.PrecoVenda,
            imagemBase64: '',
          };
        }
      } else {
        console.log('PRODUTO SEM CÓDIGO', item.Nome);
      }
    });
  }
}

export default ProductsService;
