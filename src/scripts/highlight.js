/*
 * Copyright (C) 2025 red.ornob [https://github.com/red-ornob] <red.ornob.dev@gmail.com>
 * This program is subject to the AGPL-3.0-or-later licence.
 * Check NOTICE.md at the project root for the full notice.
 */

'use strict';

const hljs = require("../lib/highlight/highlight.js");

function format_code(code_blocks) {
    code_blocks.forEach(element => {
        const lang = element.lang;
        element.classList.add("hljs");
        element.classList.add(lang ? 'language-' + lang : 'language-plaintext');
        
        console.log(element.parentElement);
        
        if (element.parentElement.tagName === "pre") {
            element.parentElement.classList.add("hljs");
            element.parentElement.classList.add(lang ? 'language-' + lang : 'language-plaintext');
        }
    
        const language = hljs.getLanguage(lang) ? lang : 'plaintext';
        element.innerHTML = hljs.highlight(element.innerHTML, { language }).value;
    });
}

module.exports = {
    format_code
}
