package main

// Import essential components
import (
	"net/http"
	"encoding/json"
)

// Struct to store the list of addresses
type AddressesMessage struct {
	AuthServer 						string				`json:"authServer"`
	GameServer 						string				`json:"gameServer"`
	TradeServer 					string				`json:"tradeServer"`
}

// Struct to store the complete message
type CompleteMessage struct {
	Success 						bool				`json:"success"`
	Addresses 						AddressesMessage	`json:"addresses"`
}

type FailedMessage struct {
	Success 						bool				`json:"success"`
}

// Declare and fill the messages
var (
	addrMsg AddressesMessage 	= AddressesMessage{ "http://178.62.116.176:3001/", "http://178.62.116.176:3000/", "http://178.62.116.176:3002/" }
	failMsg FailedMessage		= FailedMessage{ false }
	compMsg CompleteMessage 	= CompleteMessage{ true, addrMsg }
	m []byte					= getMessage( compMsg, failMsg )
)

// Produces the complete ready to send message from the complete message
func getMessage(cm CompleteMessage, fm FailedMessage) []byte {
	msg, err 	:= json.Marshal( cm )
	fmsg, ferr 	:= json.Marshal( fm )

	if err == nil && ferr == nil{
		return msg
	}

	return fmsg
}

// getServers function handling the request
func getServers(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	w.Write( m )
}

// Main function
func main() {
    http.HandleFunc("/", getServers )
    http.ListenAndServe(":8080", nil)
}
