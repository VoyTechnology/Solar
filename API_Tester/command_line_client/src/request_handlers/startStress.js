function startStress(parameters, callback) {

    //validating parameters
    if (!global.static.parameterChecker.startStress(parameters)) {
        return callback(101);
    }

    //checking if within game server
    if (global.nav.server != "Game_Server") {
        return callback(105);
    }

    // checking if stress test already in progress
    if (global.servers.game_server.stress.active) {
        return callback(109);
    }

    var numAccounts = parseInt(parameters[0]);

    // checking if testAccounts available for amount of accounts specified in parameters
    if (numAccounts > global.config.numTestAccountsAvailable - global.config.stressIdStart){
        return callback(108);
    }

    // setting stress test to active
    global.servers.game_server.stress.active = true;

    // activating stress test accounts
    for(var i=global.config.stressIdStart; i<(numAccounts+global.config.stressIdStart); i++)
    {
        // creating socket
        var stressAccount = new global.classes.stressSock(i);
        // creating a function to pass to the setTimeout function
        // setting movement interval. begins in 5 seconds to give server time to respond with an accepted message
        setTimeout(stressAccount.startMovingFunctionGenerator(stressAccount), 3000);
        // pushing to testAccount Array
        global.servers.game_server.stress.sockets.push(stressAccount);
    }


    console.log("Stress test activated".green);
    console.log(numAccounts.toString().bold.green + " Sockets moving randomly on server".green);
    console.log();
    return callback();
}

module.exports = startStress;
