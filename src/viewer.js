/*
 * Copyright (C) 2025 red.ornob [https://github.com/red-ornob] <red.ornob.dev@gmail.com>
 * This program is subject to the AGPL-3.0-or-later licence.
 * Check NOTICE.md at the project root for the full notice.
 */

'use strict';

const sanitizeHtml = require("./lib/sanitize-html.js");
const textile = require("./lib/textile.js")
const mathjax = require("./scripts/mathjax.js");
const highlight = require("./scripts/highlight.js");

document.addEventListener("DOMContentLoaded", function () {
    
    const text = "WIP: get text from whatever filesystem implementation";
    const viewer = document.querySelector('#viewer');
    
    document.addEventListener('DOMContentLoaded', function () { // need to change the event to appropriate event
        viewer.innerHTML = sanitizeHtml(text);
        
        viewer.innerHTML = textile(viewer.innerHTML);
        
        const math_blocks = viewer.querySelectorAll("code");
        mathjax.render_math(math_blocks);
        const code_blocks = viewer.querySelectorAll("code");
        highlight.format_code(code_blocks);
    });
});
