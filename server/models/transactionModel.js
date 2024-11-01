import mongoose from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

const transactionModel = mongoose.Schema({
  customer: String,
  invoiceNo: {
    type: String,
    required: true,
    unique: true,
    default: uuidv4(),
  },
  product: [
    {
      productCode: String,
      quantity: Number,
    },
  ],
  date: {
    type: Date,
    default: Date.now(),
  },
});

export default mongoose.model('Transaction', transactionModel);
