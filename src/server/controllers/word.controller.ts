const WordAdapter = require('../Adapters/WordAdapter.ts');

const createFile = async (req, res) => {
  const word = new WordAdapter();
  const fileToCreate = {
    token: req.header('Authorization').replace('Bearer ', ''),
    name: req.body.name,
    path: req.body.path,
  };
  try {
    const response = await word.createFile(fileToCreate);
    console.log(response);
    res.status(201).send(response);
  } catch (e) {
    console.log(e.response?.data.error);
    res.status(500).send(e.response?.data.error);
  }
};

module.exports = {
  createFile,
};
export {};
