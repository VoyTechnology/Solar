# Solar #
## Client Packaging Utility ##

The script builds the game for all available OSes.

---

### Installation ###
This script is not supposed to be installed everywhere, only on the build server
The download link for all the extracted prepared nwjs packages is available
[here](http://dl.razoft.net/nwjs.zip)

It is production ready and should not be tampered with.
Extract and place the `nwjs/` folder alongside the `packer` script

---

### Usage ###

`./packer <source directory> <target build directory>`

__Example__: `./packer ../client /mnt/remote/Solar/build`

__Output__
```

build/
  |- Solar_windows_x64.zip
  |- Solar_windows_x86.zip
  |
  |- Solar_linux_x64.zip
  |- Solar_linux_x86.zip
  |
  |- Solar_osx_x64.zip
  |- Solar_osx_x86.zip

```

---

### Notes ###
* OSX Version was not tested
* Do not append `/` at the end of the path
