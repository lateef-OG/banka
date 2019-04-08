import TransactionService from '../services/transaction.service';

class TransactionController {
  static creditAccount(req, res) {
    const { accountNumber } = req.params;
    const { cashier, amount } = req.body;
    const transaction = TransactionService.accountTransaction(accountNumber, amount, cashier, 'credit');
    if (transaction.error) {
      const { errorCode, message } = transaction;
      return res.status(errorCode).json({
        status: errorCode,
        error: message,
      });
    }
    return res.status(201).json({
      status: 201,
      data: transaction,
    });
  }

  static debitAccount(req, res) {
    const { accountNumber } = req.params;
    const { cashier, amount } = req.body;
    const transaction = TransactionService.accountTransaction(accountNumber, amount, cashier, 'debit');
    if (transaction.error) {
      const { errorCode, message } = transaction;
      return res.status(errorCode).json({
        status: errorCode,
        error: message,
      });
    }
    return res.status(201).json({
      status: 201,
      data: transaction,
    });
  }

  static fetchTransactions(req, res) {
    const allTransactions = TransactionService.fetchTransactions();
    return res.status(200).json({
      status: 200,
      data: allTransactions,
    });
  }

  static serverError() {
    throw new Error('Something went wrong!');
  }
}

export default TransactionController;
