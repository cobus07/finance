module.exports = function(req, res, next) {
  // Need to connect to db to authenticate
  console.log(req.body);
  res.json({msg: 'Authenticated'});
};
