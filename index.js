var express = require('express');
var app = express();
var cors = require('cors');

app.set('port', (process.env.PORT || 5000));

 app.use(cors())

app.use(express.static(__dirname + '/public'));

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get('/', function(request, response) {
    console.log('HERE')
  response.render('pages/index');
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
