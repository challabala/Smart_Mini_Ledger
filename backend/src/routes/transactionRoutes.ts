import { Router } from 'express';
import { transactionController } from '../controllers/TransactionController';
import { authMiddleware } from '../middleware/authMiddleware';
import { validateRequest } from '../middleware/validationMiddleware';
import { createTransactionSchema, updateTransactionSchema } from '../validators/transactionValidators';

const router = Router();

router.use(authMiddleware);

router.post('/', validateRequest(createTransactionSchema), transactionController.create);
router.get('/', transactionController.getAll);
router.get('/:id', transactionController.getOne);
router.put('/:id', validateRequest(updateTransactionSchema), transactionController.update);
router.delete('/:id', transactionController.delete);

export default router;
