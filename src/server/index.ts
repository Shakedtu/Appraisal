const express = require('express');
const authRoutes = require('./routers/auth.router.ts');
const driveRoutes = require('./routers/drive.router.ts');
const bodyParser = require('body-parser');

const port = 5000;
const app = express();
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use('/', authRoutes);
app.use('/', driveRoutes);

app.listen(port, () => {
  console.log(`Server is listening on port ${port}!`);
});

export {};
