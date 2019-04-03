import { Router } from 'express';
import AccountController from '../controllers/account.controller';

const router = Router();

router.get('/', AccountController.listAccounts);
router.get('/:accountNumber', AccountController.getAccount);
router.patch('/:accountNumber', AccountController.updateAccountStatus);
router.delete('/:accountNumber', AccountController.deleteAccount);
router.post('/create-account', AccountController.createAccount);

export default router;
