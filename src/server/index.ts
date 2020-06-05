import express from 'express';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port: Number = Number(process.env.PORT) || 5000;

app.get('/', (req, res) => {
  res.send('welcome');
});

app.listen(port, () => {
  console.log(`Server is listening on port ${ port }!`);
});