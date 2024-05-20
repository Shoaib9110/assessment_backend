import { Router } from 'express';
import { getAllProgress, getProgressByUserId, addProgress } from '../services/progressService';
import { getAllUsers } from '../services/userService';

const router = Router();

router.get('/progress', getAllProgress);
router.get('/progress/:userId', getProgressByUserId);
router.post('/progress', addProgress);

router.get('/users', getAllUsers);

export default router;
