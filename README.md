# TJax Notes
This is a note-taking app integrating Textile and MathJax together, written in JavaScript and using NW.js

As it stands the functionality is basic and not even usable due to a bug.
It is lacking critical features like tagging and hierarchical notes.
While I want to continue working on this, as I would want to use this daily someday, my attention is in other places.

## Usage
Notes can be written using Textile syntax along with MathJax.
To integrate MathJax within Textile, I have implemented a custom format.
`@$ Inline MathJax can be written like this$@`
Display MathJax uses the `bc` keyword with option `[math]`.
Furthermore, when using Textile block code with the `[language]` identifier,
the code block will be highlighted according to the language syntax.

These keybindings are currently hardcoded in but there is a mechanism to make it custom:
```
# only in edit mode
save: ctrl+s
open: ctrl+c
toggle preview: alt+v

# change pages
home: alt+1
view: alt+2
edit: alt+3

# misc
toggle fullscreen: alt+enter
```

The location of the config file is dependant on the os.
Windows: `%USERPROFILE%\Appdata\Local\tjax\userdata\`
MacOS: `~/Library/Application Support/tjax/userdata/`
Linux: `~/.config/tjax/userdata/`

## Compile/Contribute
Wouldnt recommend compiling, it was working and then stopped once I cloned the repo to a different machine.
But to try it out or to work on it. 
Clone it from github, cd in the directory, run `npm install` and then run `./setup.sh` to setup the files necessary.
To do this on windows, you must use wsl or translate the bash script to a bat script.
On Mac? I have no clue.

To compile, the `build.sh` script runs the right commands, 
but there seems to be an error with the NW.js build system.

### __To-Do:__
#### __v.0.1.0__
- fix NW.js bug to compile the project
#### __v.0.1.x__
- make a way to save and embed svg files
- add tracking for the svg files
- add a tagging and lookup system
- internal and inter-note link
- sync with git and custom syncing
#### __v.0.2.0__
- add partial rendering to the editor
#### __v.0.3.0__
- add full rendering to the editor?

### License
Copyright (C) 2025 [red.ornob](https://github.com/red-ornob) [<red.ornob.dev@gmail.com>](mailto:red.ornob.dev@gmail.com)\
This program is subject to the AGPL-3.0-or-later licence.\
Check NOTICE.md at the project root for the full notice.
