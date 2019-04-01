import AccountService from '../services/account.service';

class AccountController {
  static createAccount(req, res) {
    const accountDetails = req.body;
    const newAccount = AccountService.createAccount(accountDetails);
    if (newAccount.error) {
      return res.status(400).json({
        status: 400,
        error: newAccount.message,
      });
    }
    return res.status(201).json({
      status: 201,
      data: newAccount,
    });
  }
}

export default AccountController;
