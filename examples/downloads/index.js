'use strict'

/**
 * Module dependencies.
 */

var express = require('../../'); // var express = require('../../index.js)
var path = require('path'); // Require path node.js module

var app = module.exports = express(); // sets the app, and module.esports variables to express

// path to where the files are stored on disk
var FILES_DIR = path.join(__dirname, 'files') // uses global variable __dirname and a list of strings to join a path to file

// Attaches a GET route to the base url and returns an HTML page with a list of files
app.get('/', function(req, res){
  res.send('<ul>' +
    '<li>Download <a href="/files/notes/groceries.txt">notes/groceries.txt</a>.</li>' +
    '<li>Download <a href="/files/amazing.txt">amazing.txt</a>.</li>' +
    '<li>Download <a href="/files/missing.txt">missing.txt</a>.</li>' +
    '<li>Download <a href="/files/CCTV大赛上海分赛区.txt">CCTV大赛上海分赛区.txt</a>.</li>' +
    '</ul>')
});

// /files/* is accessed via req.params[0]
// but here we name it :file

// Returns a file at the given endpoint if the file exists
app.get('/files/:file(*)', function(req, res, next){
  res.download(req.params.file, { root: FILES_DIR }, function (err) {
    if (!err) return; // file sent
    if (err.status !== 404) return next(err); // non-404 error
    // file for download not found
    res.statusCode = 404;
    res.send('Cant find that file, sorry!');
  });
});

//
/* istanbul ignore next */
if (!module.parent) {
  app.listen(3000);
  console.log('Express started on port 3000');
}
