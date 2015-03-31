#Solar Command Line Client#
##Instalation##
1. Download and install Node.js
2. Download command-line-client folder
3. Navigate to command-line-client folder in terminal
4. Type "npm install"

##Running##
1. Navigate to command-line-client folder in terminal
2. Type "node solarTester.js"

##Usage##
###General###
The command line is based on establishing sockets with the server and emitting and receiving data through these sockets. Each socket created simulates another user on the server.

###Emitting Data###
The data you wish to emit will need to be placed inside the "data.json" file in the command-line-client folder. The "example data" folder is there to help you tailor the data you wish to send to the server. **you do not need to close the command line client if you wish to change the data inside the data.json file.**

###Command list###
1. **newSock x**<br>
This command will create a socket of name x and connect it to the server.
2. **usesock x**<br>
Once you have created a socket x. you can switch to use that socket by using this command. notice how the prompt now indicates that you are using this socket.
3. **leavesock**<br>
If you are using a socket and want to leave that socket use this command.
4. **delsock x**<br>
You can delete a socket by using this command followed by it's name. If you are using a socket and use this command without any parameters, it will delete the socket you are using.
5. **listSocks**<br>
This command will list all the sockets that you have created and indicates if they are closed or open (connected/disconnected to the server).
6. **emit x**<br>
This command will take the data inside of the data.json file inside the command-line-client folder and emit it to the server with the identifier x. e.g. if you wanted to emit a "start" message to the server, Just put the data you want to emit inside the data.json file and type "emit start" into the terminal. **This will only work if you are using a socket(usesock)**
7. **showlog**<br>
This command will show the latest 10 messages sent and received by the socket that you are currently using. so if you emitted a start message to the server and wish to know how the server responded. just type "emit start" then "showlog" and you will see the messages.
8. **startStress** x<br>
This command will begin a stress test. The x parameter is the number of connections to the server you wish the stress test to make. Once a stress test is started the client will create x new sockets, log them into the server (by using test accounts) and make them move around randomly. You may if you wish have more control over how much movement the sockets are doing by editing some properties inside the config.json file.
9. **stopStress**<br>
This command will stop a stress test if there is one running. It will display some statistics when the stress test has successfully stopped.
