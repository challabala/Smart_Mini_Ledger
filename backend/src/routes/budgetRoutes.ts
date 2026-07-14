import { Router } from 'express';
import { budgetController } from '../controllers/BudgetController';
import { authMiddleware } from '../middleware/authMiddleware';

const router = Router();

router.use(authMiddleware);

router.post('/', budgetController.create);
router.get('/', budgetController.getAll);
router.put('/:id', budgetController.update);
router.delete('/:id', budgetController.delete);

export default router;
