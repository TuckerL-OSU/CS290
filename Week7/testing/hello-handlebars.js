var http = require('http');

http.createServer(function(req,res){
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('Hello Tucker!');
}).listen(10014);

console.log('Server started on localhost:10014; press Ctrl-C to terminate....');