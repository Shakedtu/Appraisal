const OneDriveAdapter = require('../Adapters/OneDriveAdapter.ts');

const getDrive = (req, res) => {
  const oneDrive = new OneDriveAdapter();
  const token = req.header('Authorization').replace('Bearer ', '');
  try {
    const response = oneDrive.getFile(token);
    console.log(response);
    res.send(response);
  } catch (e) {
    console.log(e.response.data.error);
    res.status(500).send(e.response.data.error);
  }
};

const getFile = (req, res) => {
  const oneDrive = new OneDriveAdapter();
  const token = req.header('Authorization').replace('Bearer ', '');
  const path = req.body.path;
  try {
    const response = oneDrive.getFile(token, path);
    console.log(response);
    res.send(response);
  } catch (e) {
    console.log(e.response.data.error);
    res.status(500).send(e.response.data.error);
  }
};

const createFile = (req, res) => {
  const oneDrive = new OneDriveAdapter();
  const fileToCreate = {
    token: req.header('Authorization').replace('Bearer ', ''),
    name: req.body.name,
    path: req.body.path,
    content: req.body.content,
  };
  try {
    const response = oneDrive.createFile(fileToCreate);
    console.log(response);
    res.send(response);
  } catch (e) {
    console.log(e.response.data.error);
    res.status(500).send(e.response.data.error);
  }
};

const createFolder = (req, res) => {
  const oneDrive = new OneDriveAdapter();
  const folderToCreate = {
    token: req.header('Authorization').replace('Bearer ', ''),
    name: req.body.name,
    path: req.body.path,
  };
  const response = oneDrive.createFolder(folderToCreate);
  response
    .then((res) => {
      console.log(res);
      res.send(res);
    })
    .catch((e) => {
      console.log(e.response.data.error);
      res.status(500).send(e.response.data.error);
    });
};

const searchFileOrFolder = (req, res) => {
  const token = req.header('Authorization').replace('Bearer ', '');
  const oneDrive = new OneDriveAdapter();
  const name = req.body.name;
  try {
    const response = oneDrive.search(token, name);
    console.log(response);
    res.send(response);
  } catch (e) {
    console.log(e.response.data.error);
    res.status(500).send(e.response.data.error);
  }
};

const deleteFileOrFolder = (req, res) => {
  const token = req.header('Authorization').replace('Bearer ', '');
  const oneDrive = new OneDriveAdapter();
  const path = req.body.path;
  try {
    const response = oneDrive.search(token, path);
    console.log(response);
    res.send(response);
  } catch (e) {
    console.log(e.response.data.error);
    res.status(500).send(e.response.data.error);
  }
};

module.exports = {
  getDrive,
  getFile,
  createFile,
  createFolder,
  searchFileOrFolder,
  deleteFileOrFolder,
};

export {};
