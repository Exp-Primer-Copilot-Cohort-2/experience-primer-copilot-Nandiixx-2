// Create Web Server 

// Load the http module to create an http server.
var http = require('http');
var url = require('url');
var fs = require('fs');
var path = require('path');

// Configure our HTTP server to respond with Hello World to all requests.
var server = http.createServer(function (request, response) {
  var pathname = url.parse(request.url).pathname;
  console.log("Request for " + pathname + " received.");

  if (pathname === '/') {
    response.writeHead(200, { 'Content-Type': 'text/html' });
    response.write('<!DOCTYPE html><html><head><title>Comments</title></head><body>');
    response.write('<h1>Welcome to the Comments Page</h1>');
    response.write('<form action="/save" method="post">');
    response.write('<textarea name="comment" rows="6" cols="50"></textarea><br>');
    response.write('<input type="submit" value="Submit Comment">');
    response.write('</form>');
    response.write('</body></html>');
    response.end();
  } else if (pathname === '/save') {
    var body = '';
    request.on('data', function (data) {
      body += data;
    });
    request.on('end', function () {
      var post = require('querystring').parse(body);
      fs.appendFile('comments.txt', post.comment + '\n', function (err) {
        if (err) throw err;
        console.log('Comment saved!');
      });
      response.writeHead(200, { 'Content-Type': 'text/html' });
      response.write('<!DOCTYPE html><html><head><title>Comments</title></head><body>');
      response.write('<h1>Thanks for the Comment!</h1>');
      response.write('<a href="/">Back</a>');
      response.write('</body></html>');
      response.end();
    });
  } else {
    fs.readFile(path.join(__dirname, pathname), function (err, data) {
      if (err) {
        response.writeHead(404, { 'Content-Type': 'text/plain' });
        response.write('404 - Resource not found');
        response.end();
      } else {
        response.writeHead(200, { 'Content-Type': 'text/html' });
        response.write(data);
        response.end();
      }
    });
  }
});

// Listen on port 8000, IP defaults to