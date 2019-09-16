const moment = require('moment');

module.exports = (req, res, next) => {
  const stamp = moment().format('lll');
  console.log(`[${stamp}] - ${req.ip} - ${req.method} ${req.url}`);
  next();
};