import { Router } from 'express';
import alunoController from '../controllers/AlunoCotroller';

import loginVerify from '../middlewares/loginVerify';

const router = new Router();

router.get('/', alunoController.index);
router.get('/show/:id', alunoController.show);
router.post('/store', loginVerify, alunoController.store);
router.put('/update/:id', loginVerify, alunoController.update);
router.delete('/delete/:id', loginVerify, alunoController.delete);

export default router;
