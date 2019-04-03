import TransactionService from '../services/transaction.service';

class TransactionController {
  static creditAccount(req, res) {
    const { accountNumber } = req.params;
    const { cashier, amount } = req.body;
    const transaction = TransactionService.creditAccount(accountNumber, amount, cashier);
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
}

export default TransactionController;
