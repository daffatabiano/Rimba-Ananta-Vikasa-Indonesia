import Transaction from '../models/transactionModel.js';
import Product from '../models/productModel.js';
import User from '../models/userModel.js';
import { v4 as uuidv4 } from 'uuid';

export const getArchieveTransaction = async (req, res) => {
  try {
    const transactions = await Transaction.find({
      userId: req.user?._id,
      deleted: true,
    });

    if (!transactions) {
      return res.status(404).json({
        success: false,
        message: 'No Transaction Found',
        requestId: uuidv4(),
        data: null,
      });
    }

    return res.status(200).json({
      success: false,
      message: null,
      requestId: uuidv4(),
      data: transactions,
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
