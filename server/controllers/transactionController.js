import Transaction from '../models/transactionModel.js';
import Product from '../models/productModel.js';
import User from '../models/userModel.js';
import { v4 as uuidv4 } from 'uuid';

export const createTransaction = async (req, res) => {
  try {
    const userId = req.user._id;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const productIds = req.body.products.map((p) => p.productCode);
    const products = await Product.find({ _id: { $in: productIds } });
    if (products.length !== req.body.products.length) {
      return res
        .status(400)
        .json({ message: 'Some product codes are invalid' });
    }

    const newTransaction = new Transaction({
      customer: userId,
      products: req.body.products.map((product) => {
        const productData = products.find(
          (p) => p._id.toString() === product.productCode
        );
        return {
          productCode: productData._id,
          name: productData.name,
          price: productData.price,
          quantity: product.quantity,
        };
      }),
      totalAmount: req.body.products.reduce((total, product) => {
        const productData = products.find(
          (p) => p._id.toString() === product.productCode
        );
        return total + productData.price * product.quantity;
      }, 0),
      date: Date.now(),
    });
    await newTransaction.save();
    res.status(201).json({
      requestId: uuidv4(),
      success: true,
      message: 'Transaction created successfully',
      data: newTransaction,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getTransactionByUserId = async (req, res) => {
  try {
    const userId = req?.user?._id;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User Not Found',
        requestId: uuidv4(),
        data: null,
      });
    }

    const transactions = await Transaction.find({ customer: user.name });
    res.status(200).json({
      success: true,
      message: null,
      requestId: uuidv4(),
      data: transactions,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const deleteTransaction = async (req, res) => {
  try {
    const transaction = await Transaction.findById(req.params.id);
    if (!transaction) {
      return res.status(404).json({
        success: false,
        message: 'Transaction Not Found',
        requestId: uuidv4(),
        data: null,
      });
    }

    const user = await User.findById(transaction.customer);
    const product = await Product.fineOne({
      productCode: transaction.product[0].productCode,
    });

    const userHasProduct = user.products.some(
      (p) => p.productCode === transaction.product[0].productCode
    );

    if (!userHasProduct) {
      return res.status(404).json({
        success: false,
        message: 'Transaction Not Found',
        requestId: uuidv4(),
        data: null,
      });
    }

    await transaction.remove();

    await Product.findByIdAndDelete(transaction.product[0].productCode);

    user.products = user.products.filter(
      (p) => p.productCode !== transaction.product[0].productCode
    );
    await user.save();

    res.status(200).json({
      success: true,
      message: null,
      requestId: uuidv4(),
      data: null,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
      requestId: uuidv4(),
      data: null,
    });
  }
};

export const getSummary = async (req, res) => {
  try {
    const userId = req.user._id;

    const summary = await Transaction.aggregate([
      {
        $match: {
          customer: userId,
        },
      },
      {
        $unwind: '$product',
      },
      {
        $group: {
          _id: '$product.productCode',
          quantity: { $sum: '$product.quantity' },
        },
      },
      {
        $project: {
          _id: 0,
          productCode: '$_id',
          quantity: 1,
        },
      },
    ]);

    res.status(200).json({
      success: true,
      message: null,
      requestId: uuidv4(),
      data: summary,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
