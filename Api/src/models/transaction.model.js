export default class account {
  constructor(id, createdOn, accountNumber, amount, cashier, accountBalance, transactionType) {
    this.id = id;
    this.accountNumber = accountNumber;
    this.createdOn = createdOn;
    this.amount = amount;
    this.cashier = cashier;
    this.accountBalance = accountBalance;
    this.transactionType = transactionType;
  }
}
