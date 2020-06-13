const auth = require('../controllers/auth.controller');
const authRouter = require('express').Router();

authRouter.route('/auth').post(auth);

module.exports = authRouter;
