import { Router } from 'express';
import { dashboardController } from '../controllers/DashboardController';
import { authMiddleware } from '../middleware/authMiddleware';

const router = Router();

router.use(authMiddleware);

router.get('/summary', dashboardController.getSummary);

export default router;
