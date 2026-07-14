import { Router } from 'express';
import { analyticsController } from '../controllers/AnalyticsController';
import { authMiddleware } from '../middleware/authMiddleware';

const router = Router();

router.use(authMiddleware);

router.get('/', analyticsController.getAnalyticsSummary);

export default router;
