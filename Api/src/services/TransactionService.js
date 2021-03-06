/* eslint-disable eqeqeq */
/* eslint-disable max-len */
import moment from 'moment';
import TransactionData from '../data/transaction.data';
import AccountData from '../data/accounts.data';
import Transaction from '../models/transaction';
import AccountService from './AccountService';

class TransactionService {
  static validateEntry(amount, cashier) {
    if (!amount || !cashier) {
      return {
        error: true,
        message: 'amount and cashier fields are required',
        errorCode: 422,
      };
    }
    return {
      error: false,
    };
  }

  static newBalance(amount, accountNumber, type) {
    const accountDetails = AccountService.getSingleAccount(accountNumber);
    if (accountDetails.error) {
      const { error, message, errorCode } = accountDetails;
      return {
        error,
        message,
        errorCode,
      };
    }
    if (accountDetails.status === 'dormant') {
      return {
        error: true,
        message: 'Account is dormant, please reactivate account',
        errorCode: 422,
      };
    }
    let accountBalance = accountDetails.balance;
    if (type === 'credit') {
      accountBalance += amount;
    }
    if (type === 'debit') {
      if (accountBalance < amount) {
        return {
          error: true,
          message: 'Insufficient funds available',
          errorCode: 422,
        };
      }
      accountBalance -= amount;
    }
    return accountBalance;
  }

  static generateTransactionID() {
    const { transactions } = TransactionData;
    const transactionsLength = transactions.length;
    const lastId = transactions[transactionsLength - 1].id;
    const newId = lastId + 1;
    return newId;
  }

  static updateBalance(accountNumber, accountBalance) {
    const parsedNumber = parseInt(accountNumber, Number);
    const { accounts } = AccountData;
    accounts.find(account => parsedNumber === account.accountNumber).balance = accountBalance;
  }

  static accountTransaction(accountNo, amount, cashier, transactionType) {
    const parsedNumber = parseInt(accountNo, Number);
    const accountNumber = parsedNumber;
    const validatedEntry = this.validateEntry(amount, cashier);
    if (validatedEntry.error) {
      return {
        ...validatedEntry,
      };
    }
    const accountBalance = this.newBalance(amount, accountNumber, transactionType);
    if (accountBalance.error) {
      return {
        ...accountBalance,
      };
    }
    const createdOn = moment().format('DD-MM-YYYY');
    const id = this.generateTransactionID();
    const newTransaction = new Transaction(id, createdOn, accountNumber, amount, cashier, accountBalance, transactionType);
    TransactionData.transactions = [...TransactionData.transactions, newTransaction];
    this.updateBalance(accountNumber, accountBalance);
    return {
      transactionId: id,
      accountNumber,
      amount,
      cashier,
      transactionType,
      accountBalance,
    };
  }

  static fetchTransactions() {
    const { transactions } = TransactionData;
    const allTransactions = transactions.map((transaction) => {
      const transactionInstance = new Transaction(
        transaction.id,
        transaction.createdOn,
        transaction.accountNumber,
        transaction.amount,
        transaction.cashier,
        transaction.accountBalance,
        transaction.transactionType,
      );
      return transactionInstance;
    });
    return allTransactions;
  }
}

export default TransactionService;
