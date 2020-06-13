const axios = require('axios');

const authenticate = (req, res) => {
  const token = req.header('Authorization').replace('Bearer ', '');
  axios
    .get('https://graph.microsoft.com/v1.0/me', {
      headers: { Authorization: `Bearer ${ token }` },
    })
    .then((response) => {
      console.log(response);
    })
    .catch((error) => {
      console.log(error);
    });
};

module.exports = authenticate;
