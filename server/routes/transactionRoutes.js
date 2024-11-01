import express from 'express';
import {
  createTransaction,
  getTransaction,
  deleteTransaction,
  getSummary,
} from '../controllers/transactionController.js';

const routes = express.Router();

routes.post('/api/v1/transactions', createTransaction);
routes.get('/api/v1/transactions', getTransaction);
routes.delete('/api/v1/transactions/:id', deleteTransaction);
routes.get('/api/v1/transactions/summary', getSummary);

export default routes;
