const OneDriveAdapter = require('../Adapters/OneDriveAdapter.ts')

const authenticate = async (req, res) => {
  const token = req.header('Authorization').replace('Bearer ', '');
  const oneDrive = new OneDriveAdapter();
  try {
    const response = await oneDrive.getDrive(token);
    console.log(response);
    res.send('success');
  } catch (e) {
    console.log(e.response.data.error);
    res.status(500).send(e.response.data.error);
  }
};

module.exports = authenticate;
