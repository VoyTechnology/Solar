// requiring 3rd party modules
require("colors");
var ioClient = require("socket.io-client");
var readLine = require("readline");
global.args = require("commander");

// setting up command line arguments
args.version(1.1);
args.option("--local", "Use this if servers are running on the localhost", false);
args.option("--gsIP [gsIP]", "Game server IP address, default 178.62.116.176", "178.62.116.176");
args.option("--asIP [gsIP]", "Authentication server IP address, default 178.62.116.176", "178.62.116.176");
args.option("--gsPort [gsPort]", "Game server port, default 3000", 3000);
args.option("--asPort [gsPort]", "Authentication server port, default 3001", 3001);
args.option("--numLog [numLog]", "Number of logs to show on \"showlog\", default 5", 5);
args.option("--ims [ims]", "Time in miliseconds between move messages by stress test, default 20", 20);
args.parse(process.argv);

if(args.local) {
    args.gsIP = "localhost";
    args.asIP = "localhost";
}

// setting up global variables
global.config = require(__dirname + "/config.json");
global.nav = new (require(__dirname + global.config.paths.navCS))();
global.__home = __dirname;
global.io = ioClient;
global.sockets = [];
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
global.stress = {
    active : false,
    sockets :[]
};
global.startPos = {
    x : 0,
    y : 2000,
    z : 0
};

// initiating line reader
var rl = readLine.createInterface ({
    input: process.stdin,
    output: process.stdout
}); rl.setPrompt("");

// this function prompts for input and outputs errors if any
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
            requestHandlers.newSock(commandWords, prompt);
            break;

        case "delsock" :
            commandWords.splice(0,1);
            requestHandlers.delSock(commandWords, prompt);
            break;

        case "emit" :
            commandWords.splice(0,1);
            requestHandlers.emit(commandWords, prompt);
            break;

        case "listsocks" :
            commandWords.splice(0,1);
            requestHandlers.listSocks(commandWords, prompt);
            break;

        case "startstress" :
            commandWords.splice(0,1);
            requestHandlers.startStress(commandWords, prompt);
            break;

        case "stopstress" :
            commandWords.splice(0,1);
            requestHandlers.stopStress(commandWords, prompt);
            break;

        case "usesock" :
            commandWords.splice(0,1);
            requestHandlers.useSock(commandWords, prompt);
            break;

        case "showlog" :
            commandWords.splice(0,1);
            requestHandlers.showLog(commandWords, prompt);
            break;

        case "leavesock" :
            commandWords.splice(0,1);
            requestHandlers.leaveSock(commandWords, prompt);
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
