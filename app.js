// brings in the module to our code
var express = require('express'),
// initialize express application
  app = express(),
  // path is a core module built into express
  path = require('path'),
  // an ORM, allows us to write JS or noco using JS, without writing pure
  // DB code, a translator, returns database in JS object format
  mongoose = require('mongoose'),
  // morgan is a module that allows us to logs our HTTP requests
  // i.e. post, get, delete requests
  morgan = require('morgan'),
  // body parser gives us post request inside of our request.body.<attribute>
  // gives us POST params in request.body
  bodyparser = require('body-parser')
  // simulate PUT & DELETE
  methodOverride = require('method-override');