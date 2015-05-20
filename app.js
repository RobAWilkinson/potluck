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
  bodyParser = require('body-parser')
  // simulate PUT & DELETE
  methodOverride = require('method-override');

// this connects our app to our local mongodb
mongoose.connect('mongodb://localhost:27017/potluck');

// create a model, remember a model is a representation of our database
// this sets up our schema
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
// set is configuring app
app.set('views', path.join(__dirname, 'views'));
// we want to set it to use jade, a more syntactic HTML that is defaulted with
// express, its compressed HTML
app.set('view engine', 'jade');

// use is using the middleware
// we are calling our middleware, using it in our app, we want to hide this
// in production so noone sees what requests we are asking for
app.use(morgan('dev'));
// helps make our post request more readable
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
// lests us override post request and simulate puts and delete request
// we are using this method later on in our forms to override post request
app.use(methodOverride('_method'));

// Establish the routes for our app
app.get('/', function(request, response){
  // our model name is Blog, we want all the posts return, the params are
  // the specifics we want returned
  Blog.find(function(error,blogs){
    if(error){
      // this sends back the error message, fine in dev environment so don't
      // normally include this
      response.send(error);
    }
    response.render('blogs/index', {
      title: 'Blogs',
      // the key can be whatever you want, this sends back all our blogs
      blogs:blogs
    });
  });
});

// NEW
app.get('/blogs/new', function(request, response){
  response.render('blogs/new', {
    title: "Create a blog"
  });
});

// CREATE
app.post('/blogs', function(request,response){
  // the Blog is calling on our model
  var blog= new Blog();
  // the body parser middleware allows us to call on the body.title
  blog.title = request.body.title;
  blog.content = request.body.content;
  // we don't need to return anything, but we want to check for an error
  blog.save(function(error){
    if(error){
      response.send(error);
    }
    response.redirect('/');
  });
});

// SHOW
app.get('/blogs/:id', function(request,response){
  Blog.findOne({_id: request.params.id}, function(error,blog){
    if(error){
      response.send(error);
    }
    response.render('/blogs/show', {
      title: blog.title,
      blogs: blog
    });
  });
});


// defining our host
app.listen(3000);
console.log('App is listening on port 3000');