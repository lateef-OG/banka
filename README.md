# banka
Banka is a light-weight core banking application that powers banking operations like account creation, customer deposit and withdrawals. This app is meant to support a single bank, where users can signup and create bank accounts online, but must visit the branch to withdraw or deposit money.

[![Build Status](https://travis-ci.org/lateef-OG/banka.svg?branch=dev)](https://travis-ci.org/lateef-OG/banka)
[![Coverage Status](https://coveralls.io/repos/github/lateef-OG/banka/badge.svg?branch=dev)](https://coveralls.io/github/lateef-OG/banka?branch=dev)
[![Test Coverage](https://api.codeclimate.com/v1/badges/1a93d58fca21551a1d3a/test_coverage)](https://codeclimate.com/github/lateef-OG/banka/test_coverage)
[![Maintainability](https://api.codeclimate.com/v1/badges/1a93d58fca21551a1d3a/maintainability)](https://codeclimate.com/github/lateef-OG/banka/maintainability)

**UI template:** (https://lateef-og.github.io/banka/UI/)

##Built with
- [Node.js](https://nodejs.org/en/)
- [React](https://reactjs.org)
- [Express](https://expressjs.com)
- [PostgresSQL](https://postgresql.org)

## Endpoints
####Authentication
- POST **api/v1/auth/signup** Create a user account.
    request body: 
    ```bash
    {
        "email": string,
        "firstName": string,
        "lastName": string,
        "password": string,
        "type": string,
        "isAdmin": boolean
    }
    ```
- POST **api/v1/auth/login** Logs a user into the systems
    request body:
    ```bash
    {
        "email": string,
        "password": string,
    }
    ```
- GET **api/vi/auth/users** Lists all the users in the system.
- GET **api/v1/auth/users/:userId** Gets a particular user by id.
####Accounts
- POST **api/v1/accounts/** Creates a bank account.
    request body:
    ```bash
    {
        "status": string,
    }
    ```
- GET **api/v1/accounts** List all accounts in the system.
- GET **api/v1/accounts/:accountId** Gets a particular account details by id
- PATCH **api/v1/accounts/:accountId** Updates the status of an account
    request body:
    ```bash
    {
        "owner": integer,
        "type": string,
        "balance": Float,
    }
    ```
- DELETE **api/v1/accounts/:accountId** Delete an account having a particular id
####Transactions
- GET **api/v1/transactions/** List all transactions in the system.
- POST **api/v1/transactions/:accountNumber/credit** Performs a credit transaction on a particular account number.
    request body:
    ```bash
    {
        "amount": float,
        "cashier": integer
    }
    ```
- POST **api/v1/transactions/:accountNumber/debit** Performs a debit transaction on a particular account number.
    request body:
    ```bash
    {
        "amount": float,
        "cashier": integer
    }
    ```

## Installation
1. Ensure you have Node.js and npm installed

2. Clone this repo
```bash
$ git clone https://github.com/lateef-OG/banka
```
3. Change directory to the Api folder and Install Dependencies
```bash
cd Api
npm install
```
4. Start the Application
```bash
npm start
```
5. View the Application in your browser on **localhost:4000**

## Authors
* **Lateef Ogunbadejo**
