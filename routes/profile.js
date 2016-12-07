module.exports.getProfile = function(req, res, next) {
  var _id = req.session.userId;
  var db = req.db;

  db.User.findById(_id, function(err, user) {
    if (err) {
      res.json({msg: 'Get profile failed'});
    } else {
      res.json({
        id: user._id,
        name: user.name,
        username: user.username,
        create: user.create,
        update: user.update,
      });
    }
  });
};

module.exports.updateProfile = function(req, res, next) {
  var _id = req.session.userId;
  var db = req.db;
  var name = false;
  var password = false;

  if (req.body.name !== undefined && req.body.name !== '') {
    name = req.body.name;
  }

  if (req.body.password !== undefined && req.body.password !== '') {
    password = req.body.password;
  }

 if (name && password) {
   updateProfileById(db, _id, {name: name, password: password});
 } else if (name) {
   updateProfileById(db, _id, {name: name});
 } else if (password) {
   updateProfileById(db, _id, {password: password});
 }

 function updateProfileById(db, id, obj) {
     db.User.findByIdAndUpdate(id, obj, function(err, user) {
         if (err) {
           res.json({msg: 'Update profile failed'});
         } else {
           if (!user) {
             res.json({msg: 'User doesn\'t exsit'});
           } else {
             res.json({msg: 'success'});
           }
         }
     });
 }
};
