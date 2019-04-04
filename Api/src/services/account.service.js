/* eslint-disable eqeqeq */
/* eslint-disable max-len */
import moment from 'moment';
import AccountData from '../data/accounts.data';
import Account from '../models/account.model';
import UserService from './user.service';

class AccountService {
  static createAccountNumber() {
    const defaultNumber = 8030000000;
    const { accounts } = AccountData;
    const accountsLength = accounts.length;
    if (accountsLength === 0) {
      return defaultNumber;
    }
    const lastId = accounts[accountsLength - 1].id;
    const newId = lastId + 1;
    const accountNumber = defaultNumber + newId;
    return {
      accountNumber,
      newId,
    };
  }

  static createAccount(account) {
    const {
      owner,
      type,
      balance,
    } = account;
    const status = 'active';
    const parsedOwnerId = parseInt(owner, Number);
    const createdOn = moment().format('DD-MM-YYYY');
    const openingBalance = parseFloat(balance);
    const { newId, accountNumber } = this.createAccountNumber();
    const id = newId;
    const { firstName, lastName, email } = UserService.getUserById(parsedOwnerId);
    const newAccount = new Account(id, accountNumber, createdOn, owner, type, status, balance);
    AccountData.accounts = [...AccountData.accounts, newAccount];
    const response = {
      accountNumber,
      firstName,
      lastName,
      email,
      type,
      openingBalance,
    };
    return response;
  }

  static listAccounts() {
    const { accounts } = AccountData;
    return accounts.map((account) => {
      const allAccounts = new Account(
        account.id,
        account.accountNumber,
        account.createdOn,
        account.owner,
        account.type,
        account.status,
        account.balance,
      );
      return allAccounts;
    });
  }

  static getSingleAccount(accountNumber) {
    const { accounts } = AccountData;
    const parsedNumber = parseInt(accountNumber, Number);
    const accountExists = accounts.find(accountDetails => parsedNumber === accountDetails.accountNumber);
    if (!accountExists) {
      return {
        error: true,
        message: 'Account not found',
        errorCode: 404,
      };
    }
    return {
      ...accountExists,
    };
  }

  static updateAccountStatus(accountNumber, status) {
    const statuses = ['active', 'dormant'];
    if (!statuses.includes(status)) {
      return {
        error: true,
        message: 'Status should either be active or dormant',
        errorCode: 422,
      };
    }
    const { accounts } = AccountData;
    const parsedNumber = parseInt(accountNumber, Number);
    const accountExists = accounts.find(accountDetails => parsedNumber === accountDetails.accountNumber);
    if (!accountExists) {
      return {
        error: true,
        message: 'Account not found',
        errorCode: 404,
      };
    }
    accounts.find(account => parsedNumber === account.accountNumber).status = status;
    const updatedAccount = this.getSingleAccount(parsedNumber);
    return {
      ...updatedAccount,
    };
  }

  static deleteAccount(accountNumber) {
    const parsedNumber = parseInt(accountNumber, Number);
    const accountExists = this.getSingleAccount(parsedNumber);
    if (accountExists.error) {
      const { message, errorCode, error } = accountExists;
      return {
        error,
        message,
        errorCode,
      };
    }
    AccountData.accounts = AccountData.accounts.filter(account => accountNumber != account.accountNumber);
    return {
      message: 'Account deleted successfully',
    };
  }
}

export default AccountService;
