var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');

var index = require('./routes/index');
var todos = require('./routes/todos');
var friends = require('./routes/friends');

var app = express();

// View Engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);

app.use(express.static(path.join(__dirname, 'client')));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use('/', index);
app.use('/api/v1/', todos);
app.use('/api/v2/', friends);

app.get('*', function(req, res) {
  res.sendFile(path.join(__dirname, '/client/index.html'));
});

app.listen(5000, function(){
    console.log('Server started on port 5000...');
});
