module.exports = (error, req, res, next) => {
  if (error.code) {
    res
    .status(error.code)
    .json({
      ...error,
      success: false
    });
  }

  next();
};