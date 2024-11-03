import express from 'express';
import {
  createProduct,
  getProductByUserId,
  getProductDetails,
} from '../controllers/productController.js';
import { verifyAccess } from '../middlewares/verifyAccess.js';

const routes = express.Router();

routes.post('/api/v1/products', verifyAccess, createProduct);
routes.get('/api/v1/products', verifyAccess, getProductByUserId);
routes.get('/api/v1/product/:id', verifyAccess, getProductDetails);

export default routes;
