import { Router } from 'express';

// import homeRoutes from './src/routes/homeRoutes';
import userRoutes from './routes/userRoutes';
import tokenRoutes from './routes/tokenRoutes';
import alunoRoutes from './routes/alunoRoutes';
import fotoRoutes from './routes/fotoRoutes';

const router = new Router();

// app.use('/home', homeRoutes);
router.use('/users', userRoutes);
router.use('/tokens', tokenRoutes);
router.use('/alunos', alunoRoutes);
router.use('/fotos', fotoRoutes);

export default router;
