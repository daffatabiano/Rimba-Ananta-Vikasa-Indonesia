import mongoose from 'mongoose';

const transactionModel = mongoose.Schema({
  invoiceNo: {
    type: String,
    required: true,
    unique: true,
  },
  data: Date,
  customer: String,
  product: [
    {
      productCode: String,
      quantity: Number,
    },
  ],
});

export default mongoose.model('Transaction', transactionModel);
