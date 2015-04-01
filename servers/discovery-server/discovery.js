var http = require('http');
var config = require('./config.json');
var args = require('commander');

args
  .version(2.0)
  .option('-l, --local', 'Serve local server addresses')
  .option('-p, --port [port]', 'Define custom port ', config.server.port)
 .parse(process.argv);


http.createServer( function(req, res) {


  res.writeHead(200, {'Content-Type':'application/json'});

  res.end(JSON.stringify({
    'success':true,
    'addresses':{
      'authServer':
        args.local ? "http://localhost:3001" :
          process.env.AUTH_SERVER_ADDRESS ||
          config.addresses.authServer,
      'gameServer':
        args.local ? "http://localhost:3000" :
          process.env.GAME_SERVER_ADDRESS ||
          config.addresses.gameServer,
      'tradeServer':
        args.local ? "http://localhost:3002" :
          process.env.TRADE_SERVER_ADDRESS ||
          config.addresses.tradeServer,
    }
  }));

  //res.end(JSON.stringify(response));
}).listen(args.port);

console.log("Server Started on port "+ args.port);
if(args.local) console.log("Serving local addresses");
