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

  static listAccounts(req, res) {
    const accounts = AccountService.listAccounts();
    return res.status(200).json({
      status: 200,
      data: accounts,
    });
  }

  static getAccount(req, res) {
    const { accountNumber } = req.params;
    const account = AccountService.getSingleAccount(accountNumber);
    if (account.error) {
      const { errorCode, message } = account;
      return res.status(errorCode).json({
        status: errorCode,
        error: message,
      });
    }
    return res.status(200).json({
      status: 200,
      data: account,
    });
  }
}

export default AccountController;
