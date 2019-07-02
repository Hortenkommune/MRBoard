require('dotenv').config();

var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
var hbs = require('hbs');
var moment = require('moment-timezone');
// Helper to format date/time sent by Graph
hbs.registerHelper('eventDateTime', function (dateTime) {
  return moment.utc(dateTime).tz("Europe/Oslo").format('HH:mm')
});
hbs.registerHelper('meetingroom', function (room) {
  var rooms = [
    {
      regex: /blåveis/ig,
      roomname: "Blåveis"
    },
    {
      regex: /hvitveis/ig,
      roomname: "Hvitveis"
    },
    {
      regex: /soldugg/ig,
      roomname: "Soldugg"
    },
    {
      regex: /mamrelund/ig,
      roomname: "Mamrelund"
    },
    {
      regex: /bøk/ig,
      roomname: "Bøk"
    },
    {
      regex: /eik/ig,
      roomname: "Eik"
    },
    {
      regex: /hassel/ig,
      roomname: "Hassel"
    },
    {
      regex: /misteltein/ig,
      roomname: "Misteltein"
    },
    {
      regex: /stromodden/ig,
      roomname: "Stormodden"
    },
    {
      regex: /bastøy/ig,
      roomname: "Bastøy"
    },
    {
      regex: /løvøya/ig,
      roomname: "Løvøya"
    },
    {
      regex: /rødskjær/ig,
      roomname: "Rødskjær"
    },
    {
      regex: /vealøs/ig,
      roomname: "Vealøs"
    },
    {
      regex: /østenskjær/ig,
      roomname: "Østenskjær"
    },
    {
      regex: /møterom ra/ig,
      roomname: "Ra"
    },
    {
      regex: /adalsborgen/ig,
      roomname: "Adalsborgen"
    },
    {
      regex: /ynglingesalen/ig,
      roomname: "Ynglingesalen"
    },
    {
      regex: /møterom ask/ig,
      roomname: "Ask"
    },
    {
      regex: /møteromsoversikten/ig,
      roomname: "DONTSHOW"
    }
  ];
  var roomstr;
  rooms.forEach(function (i) {
    if (room.match(i.regex)) {
      console.log(i.regex);
      if (i.roomname == "DONTSHOW") {
      } else {
        if (roomstr) roomstr += ", ";
        else roomstr = "";
        roomstr += i.roomname;
      }
    }
  });
  return roomstr;
});

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

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
