import express from 'express';
import { authRouter } from './routers/auth.router';
import { driveRouter } from './routers/drive.router';
import bodyParser from 'body-parser';

const port = 5000;
const app = express();
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use('/', authRouter);
app.use('/', driveRouter);

app.listen(port, () => {
  console.log(`Server is listening on port ${port}!`);
});
