const driveCtrl = require('../controllers/drive.controller.ts');
const driveRouter = require('express').Router();

driveRouter
  .route('/drive')
  .get(driveCtrl.getDrive)
  .post(driveCtrl.createFolder);

driveRouter
  .route('/drive/:fileName')
  .get(driveCtrl.searchFileOrFolder)
  .put(driveCtrl.createFile)
  .delete(driveCtrl.deleteFileOrFolder);

module.exports = driveRouter;
export {};
