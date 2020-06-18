const OneDriveAdapter = require('../Adapters/OneDriveAdapter.ts');

const authenticate = async (req, res) => {
  const token = req.header('Authorization').replace('Bearer ', '');
  try {
    res.send('success');
  } catch (e) {
    console.log(e.response?.data.error);
    res.status(500).send(e.response?.data.error);
  }
};

module.exports = authenticate;

export { };
