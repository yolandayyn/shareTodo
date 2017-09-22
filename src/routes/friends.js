var express = require('express');
var router = express.Router();
var mongojs = require('mongojs');
var db = mongojs('mongodb://awesomeAdmin:appveryawesome@ds139954.mlab.com:39954/sharetodo',['userList', 'friendList']);

// Get User's friendlist
router.get('/friends/:email', function(req, res, next){
    db.friendList.findOne({
      _id: req.params.email
    }, function(err, list){
        if(err){
           res.send(err);
        } else {
           res.json(list);
        }
    });
});

// Add friend
router.post('/addFriend/:email/:fEmail', function(req, res, next){
  var newFriend = req.params.fEmail;
  var curUser = req.params.email;

  db.userList.findOne({"email" : newFriend}, function(error, userResult){
    if (error) {
      res.status(400);
      res.json({
        "error": "Invalid Data"
      });
    // verify if the friend is in userlist
    } else if (userResult == null) {
      res.status(400);
      res.json({
        "error": "Invalid friendName"
      });
    } else {
      db.friendList.update(
      {"_id": curUser},
      {"$push": {"friend": newFriend}},
      {"upsert": true},
      function(err, result){
        if(err){
          res.send(err);
        } else {
          res.json(result);
        }
      });
    }
  });
});

// Delete friend
router.delete('/deleteFriend/:email/:fEmail', function(req, res, next){
  var delFriend = req.params.fEmail;
  var curUser = req.params.email;
    db.friendList.update(
      {"_id": curUser},
      {"$pull": {"friend": delFriend}},
      function(err, result){
        if(err){
            res.send(err);
        } else {
            res.json(result);
        }
    });
});

module.exports = router;
