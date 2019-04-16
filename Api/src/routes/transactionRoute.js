import { Router } from 'express';
import TransactionController from '../controllers/TransactionController';

const router = Router();

router.get('/', TransactionController.fetchTransactions);
router.post('/:accountNumber/credit', TransactionController.creditAccount);
router.post('/:accountNumber/debit', TransactionController.debitAccount);

router.get('/error', TransactionController.serverError);

export default router;
