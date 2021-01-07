import { Router } from 'express';
import userController from '../controllers/UserController';
import loginVerify from '../middlewares/loginVerify';

const router = new Router();

// Não deve existir
// router.get('/', userController.index);

router.get('/show', loginVerify, userController.show);
router.post('/store', userController.store);
router.put('/update', loginVerify, userController.update);
router.delete('/delete', loginVerify, userController.delete);

export default router;
