import Product from '../models/productModel.js';

export const createProduct = async (req, res) => {
  try {
    const newProduct = await Product.create(req.body);
    res.status(201).json({
      success: true,
      message: null,
      requestId: newProduct._id,
      data: newProduct,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getProduct = async (req, res) => {
  try {
    const product = await Product.find();

    res.status(200).json({
      requestId: product._id,
      success: true,
      data: product,
      message: null,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
