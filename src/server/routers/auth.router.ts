import auth from '../controllers/auth.controller';
import { Router } from 'express';

const authRouter = Router();
authRouter.route('/auth').post(auth);

export { authRouter };
