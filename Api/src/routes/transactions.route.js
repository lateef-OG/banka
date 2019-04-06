import { Router } from 'express';
import TransactionController from '../controllers/transaction.controller';

const router = Router();

router.post('/:accountNumber/credit', TransactionController.creditAccount);
router.post('/:accountNumber/debit', TransactionController.debitAccount);

router.get('/error', TransactionController.serverError);

export default router;
