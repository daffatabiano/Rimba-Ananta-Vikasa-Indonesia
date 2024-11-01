import express from 'express';
import { createProduct, getProduct } from '../controllers/productController.js';

const routes = express.Router();

routes.post('/api/v1/products', createProduct);
routes.get('/api/v1/products', getProduct);

export default routes;
