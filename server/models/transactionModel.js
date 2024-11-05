import mongoose from 'mongoose';

const transactionModel = mongoose.Schema({
  customer: String,
  userId: String,
  invoiceNo: {
    type: String,
    required: true,
    unique: true,
  },
  products: [
    {
      productCode: {
        type: String,
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
      },
    },
  ],
  date: {
    type: Date,
    default: Date.now(),
  },
  deleted: {
    type: Boolean,
    default: false,
  },
  deletedAt: Date,
});

export default mongoose.model('Transaction', transactionModel);
