const wordCtrl = require('../controllers/word.controller.ts');
const wordRouter = require('express').Router();

wordRouter.route('/docx').post(wordCtrl.createFile);

module.exports = wordRouter;
export {};
