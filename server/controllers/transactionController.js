import Transaction from '../models/transactionModel.js';

export const createTransaction = async (req, res) => {
  try {
    const newTransaction = await Transaction.create(req.body);
    res.status(201).json({
      success: true,
      message: null,
      requestId: newTransaction._id,
      data: newTransaction,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getTransaction = async (req, res) => {
  try {
    const transaction = await Transaction.find();
    res.status(200).json({
      requestId: transaction._id,
      success: true,
      data: transaction,
      message: null,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const deleteTransaction = async (req, res) => {
  try {
    const transaction = await Transaction.findByIdAndDelete(req.params.id);
    res.status(200).json({
      requestId: transaction._id,
      success: true,
      data: transaction,
      message: null,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getSummary = async (req, res) => {
  try {
    const transaction = await Transaction.aggregate([
      {
        $group: {
          _id: null,
          totalSales: { $sum: '$price' },
        },
      },
    ]);
    res.status(200).json({
      requestId: transaction._id,
      success: true,
      data: transaction,
      message: null,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
