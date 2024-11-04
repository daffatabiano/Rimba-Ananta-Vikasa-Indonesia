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
