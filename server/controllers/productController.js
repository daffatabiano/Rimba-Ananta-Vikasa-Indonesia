import Product from '../models/productModel.js';
import User from '../models/userModel.js';
import { v4 as uuidv4 } from 'uuid';

export const createProduct = async (req, res) => {
  try {
    const userId = req.user._id;
    const newProduct = await Product.create({
      productCode: uuidv4(),
      name: req.body.name,
      price: req.body.price,
      quantity: req.body.quantity,
      creator: userId,
    });

    if (!newProduct) {
      return res.status(404).json({
        requestId: uuidv4(),
        success: false,
        message: 'Product Not Found',
        data: null,
      });
    }

    return res.status(201).json({
      requestId: uuidv4(),
      success: true,
      message: null,
      data: newProduct,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getProductByUserId = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    const products = await Product.find({ creator: user?._id });

    if (!products) {
      return res.status(404).json({
        requestId: uuidv4(),
        success: false,
        message: 'Products Not Found',
        data: null,
      });
    }

    res.status(200).json({
      requestId: uuidv4(),
      success: true,
      message: null,
      productCode: uuidv4(),
      data: products,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
