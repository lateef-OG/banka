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
}

export default AccountService;
