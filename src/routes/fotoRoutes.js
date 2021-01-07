import { Router } from 'express';

import fotoController from '../controllers/FotoController';

import loginVerify from '../middlewares/loginVerify';

const router = new Router();

router.post('/', loginVerify, fotoController.store);
router.delete('/delete/:foto_id', loginVerify, fotoController.delete);

export default router;
