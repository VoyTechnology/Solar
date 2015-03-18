# Solar Discovery Server #

Solar Discovery Server, allows the client to get the addresses of individual servers

## Compiling ##

1. Download Go from [go-lang.org/dl](https://golang.org/dl/) for your platform  
2. Install Go based on instructions from [golang.org/doc/install](https://golang.org/doc/install)  
3. Navigate to the `discovery-server` directory  
4. Run `go build discovery-server.go`  
5. This will produce an executable `discovery-server`

## Configuration ##
To configure the addresses that the server provides edit the `config.json` file

## Running ##
To run the server: `./discovery-server`

## Running as a Daemon ##
By default the server will run in the current shell  
To detach it use `& disown` at the end

To kill the daemon use platform specific instructions
> Ubuntu: `pkill discovery-server`

## Tests ##
Tests require node.js

To configure the address of the discovery-server to test change value of
`address` in `test-config.json`

__Run the tests:__
>`npm install`  
>`npm test`

---



## WARNING ##
Since this server will not require to be changed frequently (only when other servers change their address), the server addresses and port are hardcoded.

The port can be changed in the main() function and the server address values inside the var () block. They must be in order presented by AddressesMessage struct
