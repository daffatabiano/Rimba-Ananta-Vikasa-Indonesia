import Activity from '../models/activityModel.js';
import { v4 as uuidv4 } from 'uuid';
export const getActivity = async (req, res) => {
  try {
    const userId = req?.user?._id;
    const activities = await Activity.find({ userId: userId });

    return res.status(200).json({
      success: true,
      message: null,
      requestId: uuidv4(),
      data: activities,
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Something went wrong',
      success: false,
      requestId: uuidv4(),
      data: null,
    });
  }
};

export const clearActivity = async (req, res) => {
  try {
    const userId = req?.user?._id;
    const activities = await Activity.find({ userId: userId });

    if (!activities.length) {
      return res.status(404).json({
        success: false,
        message: 'No activities Found',
        requestId: uuidv4(),
        data: null,
      });
    }

    await Activity.deleteMany({ userId: userId });

    return res.status(200).json({
      success: true,
      message: 'Activities Successfully Deleted',
      requestId: uuidv4(),
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
