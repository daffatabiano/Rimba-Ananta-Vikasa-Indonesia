import Product from '../models/productModel.js';
import User from '../models/userModel.js';
import Activity from '../models/activityModel.js';
import { v4 as uuidv4 } from 'uuid';

export const createProduct = async (req, res) => {
  try {
    const user = req.user;
    const existingProduct = await Product.findOne({
      name: req.body.name,
      creator: user._id,
    });

    await Activity.create({
      userId: user._id,
      action: 'Product Created',
      details: {
        path: req.originalUrl,
        body: req.body,
        query: req.query,
      },
    });

    if (existingProduct) {
      return res.status(409).json({
        requestId: uuidv4(),
        success: false,
        message: 'Product Already Exists',
        data: null,
      });
    } else if (!user) {
      return res.status(404).json({
        requestId: uuidv4(),
        success: false,
        message: 'User Not Found',
        data: null,
      });
    }

    const newProduct = await Product.create({
      creator: user._id,
      productCode: uuidv4(),
      name: req.body.name,
      price: req.body.price,
      quantity: req.body.quantity,
    });
    return res.status(201).json({
      requestId: uuidv4(),
      success: true,
      message: 'Product created successfully',
      data: newProduct,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getProductByUserId = async (req, res) => {
  try {
    const userId = req.user._id;
    const products = await Product.find({ creator: userId, deleted: false });
    if (!products.length) {
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

export const getProductDetails = async (req, res) => {
  try {
    const productId = req.params.id;
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({
        requestId: uuidv4(),
        success: false,
        message: 'Product Not Found',
        data: null,
      });
    }
    res.status(200).json({
      requestId: uuidv4(),
      success: true,
      message: null,
      data: product,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
      requestId: uuidv4(),
      data: null,
    });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({
        requestId: uuidv4(),
        success: false,
        message: 'Product Not Found',
        data: null,
      });
    }

    await Activity.create({
      userId: req.user._id,
      action: 'Product Deleted Permanents',
      details: {
        path: req.originalUrl,
        body: req.body,
        query: req.query,
      },
    });

    await Product.findByIdAndDelete(productId);
    res.status(200).json({
      requestId: uuidv4(),
      success: true,
      message: 'Product Deleted Successfully',
      data: null,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
      requestId: uuidv4(),
      data: null,
    });
  }
};

export const archieveProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({
        requestId: uuidv4(),
        success: false,
        message: 'Product Not Found',
        data: null,
      });
    }

    product.deleted = true;
    product.deletedAt = new Date();
    await product.save();

    await Activity.create({
      userId: req.user._id,
      action: 'Product Temporary Deleted',
      details: {
        path: req.originalUrl,
        body: req.body,
        query: req.query,
      },
    });

    res.status(200).json({
      requestId: uuidv4(),
      success: true,
      message: 'Product Move to trash Successfully',
      data: null,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
      requestId: uuidv4(),
      data: null,
    });
  }
};

export const restoreProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({
        requestId: uuidv4(),
        success: false,
        message: 'Product Not Found',
        data: null,
      });
    }

    await Activity.create({
      userId: req.user._id,
      action: 'Product Restored',
      details: {
        path: req.originalUrl,
        body: req.body,
        query: req.query,
      },
    });

    product.deleted = false;
    product.deletedAt = null;
    await product.save();
    res.status(200).json({
      requestId: uuidv4(),
      success: true,
      message: 'Product Restore Successfully',
      data: null,
    });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

export const clearArchieveProduct = async (req, res) => {
  try {
    const userId = req.user._id;
    const product = await Product.find({ creator: userId, deleted: true });

    if (!product.length) {
      return res.status(404).json({
        success: false,
        message: 'No Product Found',
        requestId: uuidv4(),
        data: null,
      });
    }

    await Activity.create({
      userId: userId,
      action: 'Product Permanently All-Deleted',
      details: {
        path: req.originalUrl,
        body: req.body,
        query: req.query,
      },
    });

    await Product.deleteMany({ creator: userId, deleted: true });

    res.status(200).json({
      requestId: uuidv4(),
      success: true,
      message: 'Product Permanently Deleted Successfully',
      data: null,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
      requestId: uuidv4(),
      data: null,
    });
  }
};

export const restoreAllProducts = async (req, res) => {
  try {
    const userId = req.user._id;
    const product = await Product.find({ creator: userId, deleted: true });

    if (!product.length) {
      return res.status(404).json({
        success: false,
        message: 'No Product Found',
        requestId: uuidv4(),
        data: null,
      });
    }

    await Activity.create({
      userId: userId,
      action: 'Product Permanently Restore-All',
      details: {
        path: req.originalUrl,
        body: req.body,
        query: req.query,
      },
    });

    await Product.updateMany(
      { creator: userId, deleted: true },
      { deleted: false, deletedAt: null }
    );

    res.status(200).json({
      requestId: uuidv4(),
      success: true,
      message: 'Product Permanently Restore Successfully',
      data: null,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
      requestId: uuidv4(),
      data: null,
    });
  }
};
