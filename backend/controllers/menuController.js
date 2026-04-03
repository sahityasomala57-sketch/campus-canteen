const data = require('../data');

exports.getMenu = (req, res) => {
  res.json(data.menu);
};
