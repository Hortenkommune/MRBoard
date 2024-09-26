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
// hbs helpers
hbs.registerHelper('eventDateTime', function (dateTime) {
  return moment.utc(dateTime).tz("Europe/Oslo").format('HH:mm')
});
hbs.registerHelper('meetingroom', function (room) {
  var rooms = [
    {
      regex: /blåveis/ig,
      roomname: "Blåveis (1. etg.)"
    },
    {
      regex: /hvitveis/ig,
      roomname: "Hvitveis (1. etg.)"
    },
    {
      regex: /soldugg/ig,
      roomname: "Soldugg (1. etg.)"
    },
    {
      regex: /mamrelund/ig,
      roomname: "Mamrelund (1. etg.)"
    },
    {
      regex: /bøk/ig,
      roomname: "Bøk (2. etg.)"
    },
    {
      regex: /eik/ig,
      roomname: "Eik (2. etg.)"
    },
    {
      regex: /hassel/ig,
      roomname: "Hassel (2. etg.)"
    },
    {
      regex: /misteltein/ig,
      roomname: "Misteltein (2. etg.)"
    },
    {
      regex: /stromodden/ig,
      roomname: "Stormodden (2. etg.)"
    },
    {
      regex: /bastøy/ig,
      roomname: "Bastøy (3. etg.)"
    },
    {
      regex: /løvøya/ig,
      roomname: "Løvøya (3. etg.)"
    },
    {
      regex: /rødskjær/ig,
      roomname: "Rødskjær (3. etg.)"
    },
    {
      regex: /vealøs/ig,
      roomname: "Vealøs (3. etg.)"
    },
    {
      regex: /østenskjær/ig,
      roomname: "Østenskjær (3. etg.)"
    },
    {
      regex: /møterom ra/ig,
      roomname: "Ra (4. etg.)"
    },
    {
      regex: /adalsborgen/ig,
      roomname: "Adalsborgen (u. etg.)"
    },
    {
      regex: /ynglingesalen/ig,
      roomname: "Ynglingesalen (u. etg.)"
    },
    {
      regex: /møterom ask/ig,
      roomname: "Ask (2. etg.)"
    },
    {
      regex: /møteromsoversikten/ig,
      roomname: "DONTSHOW"
    }
  ];
  var roomstr;
  rooms.forEach(function (i) {
    if (room.match(i.regex)) {
      if (i.roomname == "DONTSHOW") {
      } else {
        if (roomstr) roomstr += ", ";
        else roomstr = "";
        roomstr += i.roomname;
      }
    }
  });
  if (!roomstr) {
    roomstr = room;
  }
  return roomstr;
});
hbs.registerHelper('now', function () {
  moment.locale('nb-no');
  var now = moment().tz("Europe/Oslo").format('LLLL');
  var slstr = now.slice(0, -10);
  return slstr;
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
