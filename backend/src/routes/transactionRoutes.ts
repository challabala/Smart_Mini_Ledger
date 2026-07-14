import { Router } from 'express';
import { transactionController } from '../controllers/TransactionController';
import { authMiddleware } from '../middleware/authMiddleware';

const router = Router();

router.use(authMiddleware);

router.post('/', transactionController.create);
router.get('/', transactionController.getAll);
router.get('/:id', transactionController.getOne);
router.put('/:id', transactionController.update);
router.delete('/:id', transactionController.delete);

export default router;
