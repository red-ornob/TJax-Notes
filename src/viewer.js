/*
 * Copyright (C) 2025 red.ornob [https://github.com/red-ornob] <red.ornob.dev@gmail.com>
 * This program is subject to the AGPL-3.0-or-later licence.
 * Check NOTICE.md at the project root for the full notice.
 */

'use strict';

const sanitizeHtml = require("./lib/sanitize-html.js");
import { marked } from "./markdown.js"

document.addEventListener("DOMContentLoaded", function () {

    const text = "WIP: get text from whatever filesystem implementation";
    const viewer = document.querySelector('#viewer');
    // buffer used to remove flickering caused by unrendered markdown and mathjax
    const buffer = document.querySelector('#buffer');
    
    document.addEventListener('DOMContentLoaded', function () { // need to change the event to appropriate event
        buffer.innerHTML = sanitizeHtml(text);
       
        // noinspection JSUnresolvedReference
        MathJax.typeset([buffer]); // typeset is not detected as a function
        
        buffer.innerHTML = marked.parse(buffer.innerHTML);
        
        viewer.innerHTML = buffer.innerHTML;
    });
});
