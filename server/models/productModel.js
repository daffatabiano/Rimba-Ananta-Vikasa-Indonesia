import mongoose from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

const productModel = mongoose.Schema({
  productCode: {
    type: String,
    required: true,
    unique: true,
    default: uuidv4(),
  },
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
});

export default mongoose.model('Product', productModel);
