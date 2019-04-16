import AccountService from '../services/AccountService';

class AccountController {
  static createAccount(req, res) {
    const accountDetails = req.body;
    const newAccount = AccountService.createAccount(accountDetails);
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

  static updateAccountStatus(req, res) {
    const { accountNumber } = req.params;
    const { status } = req.body;
    const updatedAccount = AccountService.updateAccountStatus(accountNumber, status);
    if (updatedAccount.error) {
      const { errorCode, message } = updatedAccount;
      return res.status(errorCode).json({
        status: errorCode,
        error: message,
      });
    }
    return res.status(201).json({
      status: 201,
      data: updatedAccount,
    });
  }

  static deleteAccount(req, res) {
    const { accountNumber } = req.params;
    const feedback = AccountService.deleteAccount(accountNumber);
    if (feedback.error) {
      const { errorCode, message } = feedback;
      return res.status(errorCode).json({
        status: errorCode,
        error: message,
      });
    }
    return res.status(201).json({
      status: 201,
      message: feedback.message,
    });
  }
}

export default AccountController;
