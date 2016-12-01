module.exports = function(req, res, next) {
  // Need to connect to db to authenticate
  if (req.body.username === 'qipan' && req.body.password === 'welcome') {
    res.json({msg: 'Authenticated'});
  } else {
    res.json({msg: 'Unauthenticated'});
  }
};
