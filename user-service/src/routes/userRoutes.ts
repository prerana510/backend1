import { Router } from 'express';
import { register, login, getUserById } from '../controllers/userController';

const router = Router();

router.post('/register', register);
router.post('/login', login as any);
router.get('/:id', getUserById);

export default router;
