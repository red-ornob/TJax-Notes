/*
 * Copyright (C) 2025 red.ornob [https://github.com/red-ornob] <red.ornob.dev@gmail.com>
 * This program is subject to the AGPL-3.0-or-later licence.
 * Check NOTICE.md at the project root for the full notice.
 */

'use strict';

const {mathjax} = require('../lib/mathjax/mathjax.js');
const {TeX} = require('../lib/mathjax/input/tex.js');
const {SVG} = require('../lib/mathjax/output/svg.js');
const {liteAdaptor} = require('../lib/mathjax/adaptors/liteAdaptor');
const {RegisterHTMLHandler} = require('../lib/mathjax/handlers/html');

const adaptor = liteAdaptor();
RegisterHTMLHandler(adaptor);
const tex = new TeX();
const svg = new SVG();
const math_doc = mathjax.document("", { InputJax: tex, OutputJax: svg });

function render_math(code_elements) {
    code_elements.forEach(element => {
        const code_string = element.innerText
        
        // display
        if (element.lang === 'math' && element.parentElement.lang === 'math') {
            // noinspection JSUnresolvedReference
            element.outerHTML = adaptor.outerHTML(
                math_doc.convert(element.innerText, {display: true})
            );
        }
        
        // inline
        else if (code_string.length > 2 && code_string.startsWith('$') && code_string.endsWith('$')) {
            // noinspection JSUnresolvedReference
            element.outerHTML = adaptor.outerHTML(
                math_doc.convert(code_string.slice(1, -1), {display: false})
            );
        }
    });
}

module.exports = {
    render_math
};
