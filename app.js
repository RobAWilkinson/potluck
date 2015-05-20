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

// this connects our app to our local mongodb
mongoose.connect('mongodb://localhost:27017/potluck');

// create a model, remember a model is a representation of our database
var Blog = mongoose.model( 'Blog', {
    title: String,
    content: String,
    createdAt: {
      type: Date,
      default: Date.now
    }
});

// we need to use app now to refer back to our express app and have it do those
// cool things for us
// two underscores before dirname
// we are telling it to look for the directoy views
app.set('views', path.join(__dirname, 'views'));
// we want to set it to use jade, a more syntactic HTML that is defaulted with
// express
app.set('view engine', 'jade');