var express = require('express');
var app = express();
var ejs = require('ejs');
var multer = require('multer');
app.set('views', __dirname + '/public');

app.use(express.static(__dirname + '/src'));

var bodyParser = require('body-parser')
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

const mongoose = require('mongoose');
mongoose.connect('mongodb://jiwoong:jiwoong12@ds157493.mlab.com:57493/coding', { useNewUrlParser: true });

var Board= require('./models/board');
var Notice= require('./models/Notice');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  console.log("success");
});

app.get("/", function(req,res){
    res.render('mainpage.ejs');
  });

app.get("/faqs", function(req,res){
  Board.find({}, function(err,results){
    if (err) throw err;
    res.render('faqs.ejs',{boards: results});
  });
});  

  app.get('/canvas-writing', function (req, res) {
    res.render('canvas-writing.ejs')
  })
  
  app.post('/canvas-writing', function (req, res) {
    var board = new Board({
      title: req.body.title,
      content: req.body.content
    });
    board.save(function (err) {
      if (err) return console.error(err);
  
    });
    res.redirect('/faqs');
  });
   
  
  app.get("/canvas-show/:id", function (req, res) {
    Board.findOne({ _id: req.params.id }, function (err, board) {
      board.hits++;
      board.save(function(err){
        res.render("canvas-show.ejs", { result: board })
      })
    })
  })

  app.get("/like/:id", function (req, res) {
    Notice.findOne({ _id: req.params.id }, function (err, notice) {
      notice.like++;
      notice.save(function(err){
        res.redirect('/notice-show/'+req.params.id);
      })
    })
  })
  
  app.post('/destroy/:id', function (req, res) {
    Board.remove({ _id: req.params.id }, function (err) {
      res.redirect('/');
    });
  });
  
  app.get('/canvas-rewriting/:id', function (req, res) {
    Board.findOne({ _id: req.params.id }, function (err, board) {
      res.render('canvas-rewriting.ejs', { result: board });
    })
  });
  
  app.post('/canvas-rewriting/:id', function (req, res) {
    Board.findOne({ _id: req.params.id }, function (err, board) {
      board.content = req.body.inputContent;
      board.created_at = new Date().toLocaleString().replace(/-/g,'.');
      board.save(function (err) {
        res.redirect('/canvas-show/' + board._id);
      });
    });
  });

  app.get("/notice", function(req,res){
    Notice.find({}, function(err,results){
      if (err) throw err;
      res.render('notice.ejs',{notice: results});
    });
  });

  app.get('/notice-writing', function (req, res) {
    res.render('notice-writing.ejs')
  })
  
  app.post('/notice-writing', function (req, res) {
    var notice = new Notice({
      ntitle: req.body.ntitle,
      ncontent: req.body.ncontent
    });
    notice.save(function (err) {
      if (err) return console.error(err);
  
    });
    res.redirect('/notice');
  });

  app.get("/notice-show/:id", function (req, res) {
    Notice.findOne({ _id: req.params.id }, function (err, notice) {
      notice.nhits++;
      notice.save(function(err){
        res.render("notice-show.ejs", { result: notice })
      })
    })
  })

  app.get('/canvas-writing',function(req,res){
    res.render('upload1');
  });

  app.get("/*", function (req, res) {
    res.render("nofind.ejs");
  })
  


app.listen(3000);
