const axios = require('axios');

const authenticate = async (req, res) => {
  const token = req.header('Authorization').replace('Bearer ', '');
  try {
    const response = await axios.get(
      'https://graph.microsoft.com/v1.0/me/drive',
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
  } catch (e) {
    console.log(e.response.data.error);
  }
};

module.exports = authenticate;
