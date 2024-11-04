import Activity from '../models/activityModel.js';

export const activityLogger = async (req, res, next) => {
  const userId = req.user ? req?.user?._id : null;
  const action = req.method;
  const details = {
    path: req.originalUrl,
    body: req.body,
    query: req.query,
  };
  if (userId) {
    await Activity.create;
    ({ userId, action, details });
  }
  next();
};
