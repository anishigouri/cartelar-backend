import express from 'express';

const app = express();

app.use(express.json());

app.get('/categories', (request, response) => {
  console.log('allan debbug');
  const list = [];

  list.push('aaa');
  return response.send({ message: 'Hello world' });
});

app.listen(3333, () => {
  console.log('🥰 Backend started port 3333');
});
