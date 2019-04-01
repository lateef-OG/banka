export default class account {
  constructor(id, accountNumber, createdOn, owner, type, status, balance) {
    this.id = id;
    this.accountNumber = accountNumber;
    this.createdOn = createdOn;
    this.owner = owner;
    this.status = status;
    this.type = type;
    this.balance = balance;
  }
}
