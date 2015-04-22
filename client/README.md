# Solar Client #
This folder contains the client for the Solar game.

Structure:
```
assets - All game assets
lang - Placeholder for future language expansions
lib - Contains the third party liblaries
res - Contains the styling and resources for the application
src - All the source code of the game
view - The HTML pages which are shown to the user
config.json - Configuration file storing info such as default values and settings
package.json - The manifest file required by nwjs
README.md - This current page.
nw/nw.exe - The binary for the node webkit.
```

## Installing ##
You can either download nwjs (node-webkit) directly from their page
> http://nwjs.io

or download the complete nwjs package available in the **Packaging** section and then extract the version for your platform


## Running ##
To open up the window double click the `nw` file.  
An optional argument `--local` can be passed to the application which will force
it too look locally for the discovery server. __This must be running
or the client won't be able to resolve any addresses__

To start the client using CLI with the local flag:
> `./nw --local`

In order to play you must be registered. You can register by clicking the link
provided in the login form described in the top-level README

## Packaging ##
An automated packaging suite is available to package the end-user version of the game.
The tool is called `packer` and is placed inside `client-utils` folder.

In order to "compile" the game, all nwjs files must be downloaded from
> http://dl.razoft.net/solar/nwjs.zip

The downloaded zip folder must be extracted also into `client-utils` folder.

When all files are ready, from within the `client-utils` directory, use the following command

```
chmod +x ./packer
./packer ../client target-dir
```
Where the `target-dir` is the location to export packaged Solar game

The packer tool puts all temporary files into the recycling bin, so be mindful of size
