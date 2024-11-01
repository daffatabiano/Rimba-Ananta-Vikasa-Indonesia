import express from 'express';
import {
  createProduct,
  getProductByUserId,
} from '../controllers/productController.js';

const routes = express.Router();

routes.post('/api/v1/products', createProduct);
routes.get('/api/v1/products', getProductByUserId);

export default routes;
