module.exports.getCollection = function(req, res, next) {
  var userId = req.session.userId;
  var db = req.db;
  db.Finance.find({userId: userId}, function(err, financeList) {
    if (err) {
      res.josn({msg: 'Get models failed'});
    } else {
      res.json(financeList.map(function(finance) {
        return {
          _id: finance._id,
          number: finance.number,
          purpose: finance.purpose,
          date: finance.date,
          create: finance.create,
        };
      }));
    }
  });
};

module.exports.createModel = function(req, res, next) {
  var Finance = req.db.Finance;
  var fiannceObj = req.body;
  fiannceObj.userId = req.session.userId;
  (new Finance(fiannceObj)).save(function(err, item) {
    if (err) {
      res.json({msg: 'Create finance item failed'});
    } else {
      res.json(item);
    }
  });
};

module.exports.deleteModel = function(req, res, next) {
  var db = req.db;
  var _id = req.params.id;
  console.log(_id);
  db.Finance.findByIdAndRemove(_id, function(err, item) {
    if (err) {
      console.log('Error occured when remove finance item with id ' + _id);
      res.json({msg: 'Error occured when delete finance item'});
    } else {
      if (!item) {
        res.json('The finance item doesn\'t exist');
      } else {
        console.log('INFO: delete finance item with id %s successful', _id);
        res.json({msg: 'success'});
          }
      }
  });
};
