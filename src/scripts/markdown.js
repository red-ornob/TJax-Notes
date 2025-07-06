/*
 * Copyright (C) 2025 [red.ornob](https://github.com/red-ornob) [<red.ornob.dev@gmail.com>](mailto:red.ornob.dev@gmail.com)
 * This program is subject to the AGPL-3.0-or-later licence.
 * Check NOTICE.md at the project root for the full notice.
 */

'use strict';

import { marked } from "../lib/marked.js";
const hljs = require("./lib/highlight/highlight.js");

const renderer = {
    code({ text, lang }) {
        text = text.replace(/\n$/, '');
        const classValue = lang ? 'hljs language-' + lang : 'hljs language-plaintext';
        return `<pre><code class="${classValue}">${text}\n</code></pre>`;
    }
};

const walkTokens = (token) => {
    if (token.type !== 'code') {
        return;
    }

    const language = hljs.getLanguage(token.lang) ? token.lang : 'plaintext';
    token.text = hljs.highlight(token.text, { language }).value;
};

marked.use({
//   gfm: true,
    renderer,
    walkTokens
});

export { marked };
