var models = require('../models');

module.exports = function(connection) {
  return function(req, res, next) {
    req.db = {
      User: connection.model('User', models.User),
      Finance: connection.model('Finance', models.Finance),
    };

    return next();
  };
};
