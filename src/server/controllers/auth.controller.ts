const axios = require('axios');

const authenticate = async (req, res) => {
  const token = req.header('Authorization').replace('Bearer ', '');
  try {
    const response = await axios.get('https://graph.microsoft.com/v1.0/me', {
      headers: { Authorization: `Bearer ${token}` },
    });
    res.send('success');
  } catch (e) {
    console.log(e.response.data.error);
    res.status(500).send(e.response.data.error);
  }
};

module.exports = authenticate;
