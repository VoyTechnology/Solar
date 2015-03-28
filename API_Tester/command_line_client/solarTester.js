/*
this is the file that controlls the input and calls other
files based on which command is called
*/

require("colors");
global.config = require(__dirname + "/config.json");
global.nav = new (require(__dirname + global.config.paths.navCS))();
global.__home = __dirname;
global.fs = require("fs");
global.io = require('socket.io-client');
global.classes = {
    sock : require(__dirname + global.config.paths.sockCS),
    stressSock : require(__dirname + global.config.paths.stressSockCS)
};
global.requestHandlers = {
    delSock : require(__dirname + global.config.paths.delSockRH),
    emit : require(__dirname + global.config.paths.emitRH),
    leaveSock : require(__dirname + global.config.paths.leaveSockRH),
    listSocks : require(__dirname + global.config.paths.listSocksRH),
    newSock : require(__dirname + global.config.paths.newSockRH),
    showLog : require(__dirname + global.config.paths.showLogRH),
    startStress : require(__dirname + global.config.paths.startStressRH),
    stopStress : require(__dirname + global.config.paths.stopStressRH),
    useSock : require(__dirname + global.config.paths.useSockRH)
};
global.static = {
    parameterChecker : require(__dirname + global.config.paths.parameterCheckerST)
};
global.servers = {
    game_server : {
        sockets : []
    }
};
global.stress = {
    active : false,
    sockets :[]
};

var rl = require("readline").createInterface ({
    input: process.stdin,
    output: process.stdout
}); rl.setPrompt("");

// prompting
function prompt(err) {
    if (typeof err == "number") {
        var index = err - 100;
        console.log(config.errorCodes[index].red);
    }
    process.stdout.write(global.nav.getPrompt());
    rl.resume();
}

prompt();

// called when a user writes a command
rl.on("line", function(command) {
    rl.pause();

    // tokenizing the array for easy acess to parameters
    var commandWords = command.split(" ");

    // event handlers for each command below
    switch (commandWords[0].toLowerCase()) {
        case "newsock" :
            commandWords.splice(0,1);
            global.requestHandlers.newSock(commandWords, prompt);
            break;

        case "delsock" :
            commandWords.splice(0,1);
            global.requestHandlers.delSock(commandWords, prompt);
            break;

        case "emit" :
            commandWords.splice(0,1);
            global.requestHandlers.emit(commandWords, prompt);
            break;

        case "listsocks" :
            commandWords.splice(0,1);
            global.requestHandlers.listSocks(commandWords, prompt);
            break;

        case "startstress" :
            commandWords.splice(0,1);
            global.requestHandlers.startStress(commandWords, prompt);
            break;

        case "stopstress" :
            commandWords.splice(0,1);
            global.requestHandlers.stopStress(commandWords, prompt);
            break;

        case "usesock" :
            commandWords.splice(0,1);
            global.requestHandlers.useSock(commandWords, prompt);
            break;

        case "showlog" :
            commandWords.splice(0,1);
            global.requestHandlers.showLog(commandWords, prompt);
            break;

        case "leavesock" :
            commandWords.splice(0,1);
            global.requestHandlers.leaveSock(commandWords, prompt);
            break;

        case "exit" :
            console.log("\n\nHave a nice day!\n\n".bold.green);
            process.exit(code=0);
            break;

        case "" :
            console.log();
            prompt();
            break;

        default :
            prompt(100);
    }
});

// 178.62.116.176
