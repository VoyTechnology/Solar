function discovery() {

    var config = {
        server : {
            port : 3003
        },
        addresses : {
            authServer : "http://178.62.116.176:3001",
            gameServer : "http://178.62.116.176:3000",
            tradeServer : "http://178.62.116.176:3002"
        }
    };

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
  }).listen(3003);

    console.log("\nDiscovery server listening on 3003");
}

module.exports = discovery;
