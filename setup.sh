#!/usr/bin/env bash

npm install

# copies over the libraries so they can be distributed
mkdir src/lib
cp node_modules/mathjax/es5/tex-svg-full.js src/lib/mathjax.js
cp node_modules/marked/lib/marked.esm.js src/lib/marked.js
cp node_modules/sanitize-html/index.js src/lib/sanitize-html.js
mkdir src/lib/highlight
cp node_modules/highlight.js/lib/index.js src/lib/highlight/highlight.js
cp node_modules/highlight.js/lib/core.js src/lib/highlight/
cp -r node_modules/highlight.js/lib/languages src/lib/highlight/
