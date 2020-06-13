const express = require('express');
const axios = require('axios');
const authRoutes = require('./routers/auth.router.ts');

const port = 5000;
const app = express();
app.use('/', authRoutes);

app.listen(port, () => {
  console.log(`Server is listening on port ${ port }!`);
});
