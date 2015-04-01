# Solar #
CA110 Space Game

## Installation ##

The `solar` bash script is designed to most of the tasks automatically.

1. Download `solar` bash script and allow execution:
> `wget cdn.razoft.net/solar && chmod +x ./solar`

2. Run `./solar` to get fimiliar with the commands

3. Run `./solar pull` to pull the code from the Github repository.

4. Run `./solar install`, preferably with `sudo` to install required packages

5. Run `./solar run` to run the servers locally

6. Run `./solar play` to start the game

7. Run `./solar tester` to launch the API tester

8. Run `./solar pack` to create a packaged multiplatform version

9. Run ``./solar remove` to remove the `Solar/` folder, `sudo` recommended


## Playing ##
In order to play, a user must be registered with the system.
An email is send with a confirmation that the user
When the user has confirmed his account he can authenticate.

## Warnings ##
* The `solar` script doesn't work on Windows. Mac compatibility not tested.
* `remove` command might potentially result in unwanted changes as its using
`rm -rf ./Solar`. Make sure there are no symbolic links pointing to important files.
