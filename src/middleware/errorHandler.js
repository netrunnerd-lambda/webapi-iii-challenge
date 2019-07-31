module.exports = (error, req, res, next) => {
  res
    .status(error.code)
    .json({
      ...error,
      success: false
    });
  next();
};