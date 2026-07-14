import { Router } from 'express';
import { budgetController } from '../controllers/BudgetController';
import { authMiddleware } from '../middleware/authMiddleware';
import { validateRequest } from '../middleware/validationMiddleware';
import { createBudgetSchema, updateBudgetSchema } from '../validators/budgetValidators';

const router = Router();

router.use(authMiddleware);

router.post('/', validateRequest(createBudgetSchema), budgetController.create);
router.get('/', budgetController.getAll);
router.put('/:id', validateRequest(updateBudgetSchema), budgetController.update);
router.delete('/:id', budgetController.delete);

export default router;
