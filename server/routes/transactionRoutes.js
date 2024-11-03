import express from 'express';
import {
  archieveTransaction,
  createTransaction,
  deleteTransaction,
  getSummary,
  getTransactionByUserId,
  restoreTransactionDeleter,
} from '../controllers/transactionController.js';
import { verifyAccess } from '../middlewares/verifyAccess.js';
import { getArchieveTransaction } from '../controllers/archieveController.js';

const routes = express.Router();

routes.post('/api/v1/transactions', verifyAccess, createTransaction);
routes.get('/api/v1/transactions', verifyAccess, getTransactionByUserId);
routes.put('/api/v1/transaction/:id', verifyAccess, archieveTransaction);
routes.put(
  '/api/v1/transactions/:id/restore',
  verifyAccess,
  restoreTransactionDeleter
);
routes.delete('/api/v1/transaction/:id', verifyAccess, deleteTransaction);
routes.get('/api/v1/transactions/summary', verifyAccess, getSummary);
routes.get('/api/v1/archieved', verifyAccess, getArchieveTransaction);

export default routes;
