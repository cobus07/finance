module.exports = function(req, res, next) {
  // Need to connect to db to authenticate
  if (req.body.username === 'qipan' && req.body.password === 'welcome') {
    req.session.user = req.body.username;
    res.json({msg: 'Authenticated'});
    console.log('user %s log in successfully.', req.body.username);
  } else {
    res.json({msg: 'Unauthenticated'});
    console.log('user %s log in failed', req.body.username);
  }
};
