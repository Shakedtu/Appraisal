const driveCtrl = require('../controllers/drive.controller.ts');
import { Router } from 'express';

const driveRouter = Router();
driveRouter
  .route('/drive')
  .get(driveCtrl.getDrive)
  .post(driveCtrl.createFolder);

driveRouter
  .route('/drive/:fileName')
  .get(driveCtrl.searchFileOrFolder)
  .put(driveCtrl.createFile)
  .delete(driveCtrl.deleteFileOrFolder);

export { driveRouter };
