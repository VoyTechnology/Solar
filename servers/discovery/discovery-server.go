package main

import (
	"net/http"
	"io/ioutil"
)

var file, err = ioutil.ReadFile("./config.json")

func getServers(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	w.Write( file )
}

func main() {
	http.HandleFunc("/getServers", getServers )
	http.ListenAndServe(":3003", nil)
}
