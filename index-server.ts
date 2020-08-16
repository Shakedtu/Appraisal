import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import cors from 'cors';
import bodyParser from 'body-parser';

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;
const buildPath = path.join(__dirname, 'build');
const staticPath = path.join(buildPath, 'static');

app.use(cors());
app.use(bodyParser.json());
app.use(express.static(staticPath));

app.get('/ping', (req, res) => {
  res.send('welcome');
});

app.get('/', function (req, res) {
  res.sendFile(path.join(buildPath, 'index.html'));
});

app.listen(port, () => {
  console.log(`Server is listening on port ${port}!`);
});

module.exports = app;
