/*
 * Copyright (C) 2025 [red.ornob](https://github.com/red-ornob) [<red.ornob.dev@gmail.com>](mailto:red.ornob.dev@gmail.com)
 * This program is subject to the AGPL-3.0-or-later licence.
 * Check NOTICE.md at the project root for the full notice.
 */

'use strict';

const { mathjax } = require('mathjax/es5/node-main');
const { TeX } = require('mathjax/es5/input/tex');
const { SVG } = require('mathjax/es5/output/svg');

const sanitizeHtml = require("./lib/sanitize-html.js");
const textile = require("./lib/textile.js")

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
            buffer.innerHTML = textile(buffer.innerHTML);
            
            const math_elements = buffer.querySelectorAll("pre.math > code.math");

            const tex = new TeX();
            const svg = new SVG();
            const doc = mathjax.document('', { InputJax: tex, OutputJax: svg });
            math_elements.forEach(element => {
                element.outerHTML = doc.convert(element.innerText, { display: true });
            })
            
            viewer.innerHTML = buffer.innerHTML;
            toRender = false;
        }
    }, 1);
});
