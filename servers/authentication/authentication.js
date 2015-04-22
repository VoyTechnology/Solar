function authentication() {
	// initialising server
	var app = express();
	app.use(bodyParser.json());
	app.use(bodyParser.urlencoded({extended : false }));

	// adding server event handlers
	app.get("/authenticate", auth.actions.authenticate);
	app.get("/register", auth.actions.register);
	app.get("/completeRegister", auth.actions.completeRegister);
	app.get("/newPassword", auth.actions.newPassword);
	app.get("/completeNewPassword", auth.actions.completeNewPassword);
	app.get("/version", function(req,res){res.json(version);res.end();});

	// starting Server
	app.listen(3001);
	console.log("\nAuthentication server listening on port 3001");

}

module.exports = authentication;
