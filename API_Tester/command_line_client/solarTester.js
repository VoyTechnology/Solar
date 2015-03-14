global.assets = {
    rl : require("readline").createInterface ({
        input: process.stdin,
        output: process.stdout
    }),
    __home : __dirname,
    config : require(__dirname + "/config.json"),
    sockets : [],
    nav : {
        base : "SolarTester",
        socket : null,
        full : null,
        reload : function(){
            global.assets.nav.full = global.assets.nav.base.green;
            if(global.assets.nav.socket !== null) {
                global.assets.nav.full += "." + global.assets.nav.socket.yellow;
            }
            global.assets.nav.full += " -> ";
        }
    },
    fs : require("fs"),
    actions : null
};

global.assets.actions = {
    sockCS : require(__dirname + global.assets.config.paths.sockCS)
};


require("colors");
global.assets.rl.pause();

global.assets.nav.reload();
process.stdout.write(global.assets.nav.full);
global.assets.rl.resume();

global.assets.rl.on("line", function(command) {

    global.assets.rl.pause();
    var commandWords = command.split(" ");

    switch (commandWords[0].toLowerCase()) {
        case "newsock" :
            console.log("Good".green);
            console.log(commandWords);
            process.stdout.write(global.assets.nav.full);
            global.assets.rl.resume();
            break;

        case "delsock" :
            console.log("Good".green);
            console.log(commandWords);
            process.stdout.write(global.assets.nav.full);
            global.assets.rl.resume();
            break;

        case "closesock" :
            console.log("Good".green);
            console.log(commandWords);
            process.stdout.write(global.assets.nav.full);
            global.assets.rl.resume();
            break;

        case "opensock" :
            console.log("Good".green);
            console.log(commandWords);
            process.stdout.write(global.assets.nav.full);
            global.assets.rl.resume();
            break;

        case "emit" :
            console.log("Good".green);
            console.log(commandWords);
            process.stdout.write(global.assets.nav.full);
            global.assets.rl.resume();
            break;

        case "listsocks" :
            console.log("Good".green);
            console.log(commandWords);
            process.stdout.write(global.assets.nav.full);
            global.assets.rl.resume();
            break;

        case "startstress" :
            console.log("Good".green);
            console.log(commandWords);
            process.stdout.write(global.assets.nav.full);
            global.assets.rl.resume();
            break;

        case "stopstress" :
            console.log("Good".green);
            console.log(commandWords);
            process.stdout.write(global.assets.nav.full);
            global.assets.rl.resume();
            break;

        default :
            console.log("Bad Command".red);
            console.log(commandWords);
            process.stdout.write(global.assets.nav.full);
            global.assets.rl.resume();
    }

});
