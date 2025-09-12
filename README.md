# TJax Notes
#### Video Demo: <https://youtu.be/>
#### Description: A Notetaking app with integrations with Textile and Mathjax written in Javascript.

I have been using Anki for my last couple years of education.
Although it is a great tool with abstracted away html formating and Mathjax integration.
I prefer when the notes are written with plaintext, and can be read easily with plain text.
While there are other apps like this, none of them have everything I need. Mathjax support being a big one.
That's why I created this app, it writes the notes in plaintext with beautifully formatted Textile.

I had considered C# but I ultimately choose JS as I thought something that natively works with html will work better.
This is because both markup languages and mathjax are meant to be converted to html.
I also found a webview called NW.js which acts as a lightweight web browser but acts like a native app.

Starting from the top, `index.js` is the entry of the application.
It imports the `init` function from `script/init.js` and calls it. If it fails, it lets the user know and exits.
On a success it tells NW.js to open `index.html` and there is a callback function to maximize the window after it opens.

The `index.html` is the main page. 
All the pages sources `scripts/keybind.js` which registers the keybindings for the app.
They all also have their styles defined in their respective css file under `styles/`.
The main page consists of a colourful title and two buttons redirecting to `viewer.html` and `editor.html`.

`editor.html` is the page where the user will write their notes.
Alongside its own css file, it also calls for a `styles/codestyles/pop.css`, which defines how a code block looks.
It contains a toolbar with buttons to navigate to the other pages.
There is a small `<input>` box for the title, one large `<textarea>` for writing the note.
The viewer `<div>` container will render the note and display it, this can be toggled on or off with `alt + v`.
You can also see a buffer, which exists to not cause flicker in the viewer container when text is rendering.
All the logic of rendering is carried off by the `editor.js` script.
After writing a note, the user can save it using `ctrl + s`

The `viewer.html` page is very similar to the editor.
But it does not have a title or editor container.
Instead, there is a file tree viewer, there to help the user find their previously written files.
However, the user always has the option to manually open a file using `ctrl + o`.
It's internal logic is carried off by `viewer.js`.

The `editor.js` script checks for when the editor container is changed.
The text is copied to the buffer, and a flag to render is set to true,
A render function is called every millisecond, which checks if the render flag is true.
This is done to not queue a render request at each input but to let it render only when it needs to.
The render function first sets the render flag back to false.
After which it converts the textile markup to html.
It converts the math code blocks to embedded svg files 
and then the remaining code blocks are formatted and highlighted.
Lastly the html within the buffer is copied over to the viewer.

`viewer.js` renders the note in the same way.
However, as it does not have a changing editor container, it waits for the change in the viewer.
The viewer changes the note it is showing whenever a different file is clicked in the file tree.
The `file_tree` function from the `scripts/file-tree.js` script is called to handle the logic of the tree.

The `/lib` folder holds he copied over `node_modules` files needed for the project.
As the `src/` folder is meant to be packaged and distributed, this needs to be done to reduce distribution size.

`init.js` contains a main function `init` which creates and updates the config directory and file.
It selects the correct location based on the operating system.
When the config is created, it prompts the user on where to write the notes to and ensures it exists.
When updating, it compares the current config file with the default to look for any changes,
any new key is added and config file is rewritten.

`userdata.js` is used to find and load the config file.
This is used when the app needs to know a setting value.

The file tree is created and maintained by `file-tree.js`.
First it gets all the files and folders in an ordered and nested object.
It creates the `<div>` tree container and the `<ul>` root directory element.
Under which a `<details>` container is created so that the dir can be collapsed.
The `<summary>` container holds the directory name.
then all the files are populated as a tree on another `<ul>` container.
The files are populated as `<li>` containers, 
whereas directories are again an `<ul>` tag under a `<details>` tag.
With the tree properly populated, an event listener is added for any clicks in the file tree.
When a click lands on a file list tag, it updates viewer container and dispatches an input event.

The keybindings are handled by `keybind.js`.
The `bind` function takes the key and its modifiers along with the function to be called when pressed.
This is written in a way such that a json file defining the bindings can be used to define the bindings.
The `set_keybindings` function checks the page name and binds the appropriate keys to their functions.
The bindings are:-
- `toggleViewer`: `alt + v` 
- `saveFile`: `ctrl + S`
- `openFile`: `ctrl + o`
- `goHome/View/Edit`: `alt + 1/2/3`
- `toggleFullscreen`: `alt + enter`

The math code blocks are rendered to svg using `mathjax.js`.
This script sets up mathjax and then for each code block, 
it checks if they and their parent are defined with the math `lang` attribute.
For those blocks that pass, they are block elements and are rendered as so.
For inline elements, it is checked if they start and end with `$`, in which case they are rendered as inline.


`highlight.js` is used to highlight the code blocks.
`hljs` class is added to every code block so highlight-js css files know what to effect.
The `lang` attribute is used to add a class which lets highlight-js css files know what language the code block is in.
If a `<pre>` container is the parent container, 
It is not an inline code block and the same classes are added to the parent container.
Lastly they are sent over to the highlight function with the appropriate language parameter.
