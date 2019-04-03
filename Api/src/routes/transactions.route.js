import { Router } from 'express';
import TransactionController from '../controllers/transaction.controller';

const router = Router();

router.post('/:accountNumber/credit', TransactionController.creditAccount);

export default router;
