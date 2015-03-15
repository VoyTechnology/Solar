require("colors");
global.config = require(__dirname + "/config.json");
global.nav = new (require(__dirname + global.config.paths.navCS))();
global.__home = __dirname;
global.fs = require("fs");
global.classes = {
    sock : require(__dirname + global.config.paths.sockCS)
};
global.requestHandlers = {
    closeSock : require(__dirname + global.config.paths.closeSockRH),
    delSock : require(__dirname + global.config.paths.delSockRH),
    emit : require(__dirname + global.config.paths.emitRH),
    leaveSock : require(__dirname + global.config.paths.leaveSockRH),
    listSocks : require(__dirname + global.config.paths.listSocksRH),
    newSock : require(__dirname + global.config.paths.newSockRH),
    openSock : require(__dirname + global.config.paths.openSockRH),
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

var rl = require("readline").createInterface ({
    input: process.stdin,
    output: process.stdout
}); rl.setPrompt("");





function prompt() {
    process.stdout.write(global.nav.getPrompt());
    rl.resume();
}

prompt();

rl.on("line", function(command) {
    rl.pause();

    var commandWords = command.split(" ");

    switch (commandWords[0].toLowerCase()) {
        case "newsock" :
            commandWords.splice(0,1);
            global.requestHandlers.newSock(commandWords, prompt);
            break;

        case "delsock" :
            commandWords.splice(0,1);
            global.requestHandlers.delSock(commandWords, prompt);
            break;

        case "closesock" :
            commandWords.splice(0,1);
            global.requestHandlers.closeSock(commandWords, prompt);
            break;

        case "opensock" :
            commandWords.splice(0,1);
            global.requestHandlers.openSock(commandWords, prompt);
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

        case "" :
            prompt();
            break;

        default :
            console.log("ERROR".red);
            console.log(global.config.errorCodes.e100.red);
            prompt();
    }
});
