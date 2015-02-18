# Solar Client #
This folder contains the client for the Solar game.

## Installation ##
### Cloning Repo:  ###
>`git clone https://github.com/CPSSD/space`

### Download nw.js (node-webkit) ###
[http://nwjs.io](http://nwjs.io)

Put the downloaded files into `client` directory

Download the temporary planet texture from [here](https://raw.githubusercontent.com/VoyTechnology/ThreejsPlayground/master/Space/2_no_clouds_8k.jpg) and place it in `res/icons/` with the file name `2_no_clouds_8k.jpg` (default).

### Running ###
Open up `nw` or `nw.exe` depending on your platform.

To enter the game, press `Play` in the launcher.

The game will open full screen. Here you can fly around with WASD keys, up and down with RF and roll with QE. To change the direction the camera is facing, move the mouse or use the arrow keys.

If you wish to close the game press Escape and `Quit Game`.

A game console called Gonsole is also available by pressing F12.

####Gonsole Commands:####

| command | effect |
|---------|--------|
| version | displays the version of the client |
| devtools | shows the Chrome Dev Tools |
| test | launches the testing suite |
| clear | clears the gonsole |


### Testing ###
Due to very graphical nature of the client, there are very little tests. To launch the available tests start the game and use the Gonsole as described above. 
