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
import {file_view} from "./scripts/file-tree.js"

async function viewer() {
    const viewer = document.querySelector('#viewer');
    
    await file_view(function render(content) {
        viewer.innerHTML = sanitizeHtml(content);
        
        viewer.innerHTML = textile(viewer.innerHTML);
        
        const math_blocks = viewer.querySelectorAll("code");
        mathjax.render_math(math_blocks);
        const code_blocks = viewer.querySelectorAll("code");
        highlight.format_code(code_blocks);
    });
}

await viewer()
