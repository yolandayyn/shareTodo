var express = require('express');
var router = express.Router();
var mongojs = require('mongojs');
var db = mongojs('mongodb://xx254:xin1994_@ds135364.mlab.com:35364/todos',['todos']);

var redisClient = require('redis').createClient;
var redis = redisClient(6379, 'localhost');


// redis.get(title, function (err, reply) {
//     if (err) callback(null);
//     else if (reply) //Book exists in cache
//     callback(JSON.parse(reply));
//     else {
//         //Book doesn't exist in cache - we need to query the main database
//         db.collection('text').findOne({
//             title: title
//         }, function (err, doc) {
//             if (err || !doc) callback(null);
//             else {\\Book found in database, save to cache and
//                 return to client
//                 redis.set(title, JSON.stringify(doc), function () {
//                     callback(doc);
//                 });
//             }
//         });
//     }
// });


// Get Todos
router.get('/todos/:uid', function(req, res, next){
    var uid = req.params.uid;
    
    redis.get(uid, function (err, reply) {
        if (err) callback(null);
        else if (reply) //Book exists in cache
        callback(JSON.parse(reply));
        else {
            db.todos.find({
                uid: req.params.uid
              }, function(err, todoItems){
                  console.log(todoItems);
                  for(var i=0; i<todoItems.length; i++){
                    var singleItem = todoItems[i];
                    redis.hset(uid, singleItem["_id"].toString(), JSON.stringify(singleItem), redis.print);
                
                  }
                  res.json(todoItems);
              });
              
        }
    })
    
});

// Get Single Todo
router.get('/todo/:id', function(req, res, next){
    db.todos.findOne({
        _id: mongojs.ObjectId(req.params.id)
    }, function(err, todo){
        if(err){
           res.send(err);
        } else {
           res.json(todo);
        }
    });
});

// Save Todo
router.post('/todo', function(req, res, next){
    var todo = req.body;
    if(!todo.text || !(todo.isCompleted + '')){
        res.status(400);
        res.json({
            "error": "Invalid Data"
        });
    } else {
        db.todos.save(todo, function(err, result){
            if(err){
                res.send(err);
            } else {
                res.json(result);
            }
        });
    }
});

// Update Todo
router.put('/todo/:id', function(req, res, next){
    var todo = req.body;
    var updObj = {};

    if(todo.isCompleted){
       updObj.isCompleted = todo.isCompleted;
    }

    if(todo.text){
        updObj.text = todo.text;
    }

    if(todo.isPublic) {
      updObj.isPublic = todo.isPublic;
    }

    if(todo.uid) {
      updObj.uid = todo.uid;
    }


    if(!updObj){
        res.status(400);
        res.json({
            "error": "Invalid Data"
        });
    } else {
        db.todos.update({
            _id: mongojs.ObjectId(req.params.id)
        },updObj, {}, function(err, result){
            if(err){
                res.send(err);
            } else {
                res.json(result);
            }
        });
    }
});

// Delete Todo
router.delete('/todo/:id', function(req, res, next){
    db.todos.remove({
        _id: mongojs.ObjectId(req.params.id)
    },'', function(err, result){
        if(err){
            res.send(err);
        } else {
            res.json(result);
        }
    });
});

module.exports = router;
