var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var Product = require('./routes/product');
var bodyParser = require('body-parser');

var app = express();
//开启
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

// app.all('*',function (req,res,next) {
//     res.header("Access-Control-Allow-Origin","*");
//  　 res.header("Access-Control-Allow-Headers","Content-Type");
//     next();
// });
app.use(function (req,res,next) {
    res.header("Access-Control-Allow-Origin","*");
 　 res.header("Access-Control-Allow-Headers","Origin, X-Requested-With, Content-Type, Accept");
    next();
});

    app.use(function (req, res) {   
        res.setHeader('Content-Type', 'text/plain')   
        res.write('you posted:\n') 
        res.end(JSON.stringify(req.body, null, 2)) 
    })

app.use('/', Product);
app.use('/users', usersRouter);
app.use('/product', Product);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});
module.exports = app;
