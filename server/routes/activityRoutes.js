import express from 'express';
import {
  clearActivity,
  getActivity,
} from '../controllers/activityController.js';
import { verifyAccess } from '../middlewares/verifyAccess.js';

const routes = express.Router();

routes.get('/api/v1/activities', verifyAccess, getActivity);
routes.delete('/api/v1/all-activities', verifyAccess, clearActivity);

export default routes;
