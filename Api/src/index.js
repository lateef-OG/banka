import express from 'express';
import bodyParser from 'body-parser';
import Users from './routes/users.route';
import Accounts from './routes/accounts.route';
import Transactions from './routes/transactions.route';

const app = express();

app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to Banka API',
  });
});

app.use('/api/v1/auth', Users);
app.use('/api/v1/accounts', Accounts);
app.use('/api/v1/transactions', Transactions);

app.use((req, res, next) => {
  const error = new Error('Not found');
  error.status = 404;
  next(error);
});

app.use((error, req, res) => {
  res.status(error.status || 500).json({
    error: {
      message: error.message,
    },
  });
});

export default app;
