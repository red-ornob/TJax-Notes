/*
 * Copyright (C) 2025 [red.ornob](https://github.com/red-ornob) [<red.ornob.dev@gmail.com>](mailto:red.ornob.dev@gmail.com)
 * This program is subject to the AGPL-3.0-or-later licence.
 * Check NOTICE.md at the project root for the full notice.
 */

'use strict';

const sanitizeHtml = require("./lib/sanitize-html.js");
import { marked } from "./markdown.js"

document.addEventListener("DOMContentLoaded", function () {

    const editor = document.querySelector('#editor');
    const viewer = document.querySelector('#viewer');
    // buffer used to remove flickering caused by unrendered markdown and mathjax
    const buffer = document.querySelector('#buffer');
    
    let toRender = false;
    
    editor.addEventListener('input', function () {
        buffer.innerHTML = sanitizeHtml(editor.value);
        toRender = true;
    });
    
    setInterval(function render() { // to limit the number of calls
        if (toRender) {
            // noinspection JSUnresolvedReference
            MathJax.typeset([buffer]); // typeset is not detected as a function
            
            buffer.innerHTML = marked.parse(buffer.innerHTML);
            
            viewer.innerHTML = buffer.innerHTML;
            toRender = false;
        }
    }, 1);
});
