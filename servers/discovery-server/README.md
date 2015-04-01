# Solar Discovery Server #

Solar Discovery Server, allows the client to get the addresses of individual servers

## Installing ##
While inside the directory, run `npm install`

## Running ##
To get the list of CLI arguments use `node discovery.js --help`.

>`node discovery.js`  

Allows to run with the default server values provided in `config.json`.

---

>`AUTH_SERVER_ADDRESS=http://localhost:3001 node discovery.js`

Allows to define the server addresses using ENV variables. Available servers:
  * AUTH_SERVER_ADDRESS
  * GAME_SERVER_ADDRESS
  * TRADE_SERVER_ADDRESS

---

>`node discovery.js --local`

Runs the discovery server with all addresses local

---

>`node discovery.js --port [port]`

Allows to change the listening port of the discovery server. Default: `3003`

---

## Running as a Daemon ##
To run the discovery server as daemon, use `forever start discover.js`.
You can pass the CLI arguments as defined in __Running__

## Tests ##

To configure the address of the discovery-server to test change, use the `--address` argument. Default is localhost

__Run the tests:__
>`npm test`  
> or  
> `npm test --address [address]`

---
