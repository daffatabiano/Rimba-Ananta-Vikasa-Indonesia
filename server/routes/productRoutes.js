import express from 'express';
import {
  archieveProduct,
  clearArchieveProduct,
  createProduct,
  deleteProduct,
  getProductByUserId,
  getProductDetails,
  restoreAllProducts,
  restoreProduct,
} from '../controllers/productController.js';
import { verifyAccess } from '../middlewares/verifyAccess.js';
import { getArchieveProduct } from '../controllers/archieveController.js';

const routes = express.Router();

routes.post('/api/v1/products', verifyAccess, createProduct);
routes.get('/api/v1/products', verifyAccess, getProductByUserId);
routes.get('/api/v1/product/:id', verifyAccess, getProductDetails);
routes.put('/api/v1/product-archieved/:id', verifyAccess, archieveProduct);
routes.put('/api/v1/product/:id/restored', verifyAccess, restoreProduct);
routes.delete('/api/v1/delete-product/:id', verifyAccess, deleteProduct);
routes.get(
  '/api/v1/products/get-archieved-product',
  verifyAccess,
  getArchieveProduct
);
routes.delete(
  '/api/v1/products/clear-archieve',
  verifyAccess,
  clearArchieveProduct
);
routes.put('/api/v1/products/restore-all', verifyAccess, restoreAllProducts);

export default routes;
