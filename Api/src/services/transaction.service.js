/* eslint-disable eqeqeq */
/* eslint-disable max-len */
import moment from 'moment';
import TransactionData from '../data/transaction.data';
import AccountData from '../data/accounts.data';
import Transaction from '../models/transaction.model';
import AccountService from './account.service';

class TransactionService {
  static creditAccount(accountNumber, amount, cashier) {
    if (!amount || !cashier) {
      return {
        error: true,
        message: 'amount and cashier fields are required',
        errorCode: 422,
      };
    }
    const accountDetails = AccountService.getSingleAccount(accountNumber);
    if (accountDetails.error) {
      const { error, message, errorCode } = accountDetails;
      return {
        error,
        message,
        errorCode,
      };
    }
    const accountBalance = accountDetails.balance + amount;
    const createdOn = moment().format('DD-MM-YYYY');
    const { transactions } = TransactionData;
    const transactionsLength = transactions.length;
    const lastId = transactions[transactionsLength - 1].id;
    const newId = lastId + 1;
    const id = newId;
    const transactionType = 'credit';

    const newTransaction = new Transaction(id, accountNumber, createdOn, cashier, amount, transactionType, accountBalance);
    TransactionData.transactions = [...TransactionData.transactions, newTransaction];

    const parsedNumber = parseInt(accountNumber, Number);
    const { accounts } = AccountData;
    accounts.find(account => parsedNumber === account.accountNumber).balance = accountBalance;

    return {
      transactionId: id,
      accountNumber,
      amount,
      cashier,
      transactionType,
      accountBalance,
    };
  }
}

export default TransactionService;
