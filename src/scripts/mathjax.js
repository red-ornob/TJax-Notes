/*
 * Copyright (C) 2025 [red.ornob](https://github.com/red-ornob) [<red.ornob.dev@gmail.com>](mailto:red.ornob.dev@gmail.com)
 * This program is subject to the AGPL-3.0-or-later licence.
 * Check NOTICE.md at the project root for the full notice.
 */

window.MathJax = {
    tex: {
        inlineMath: [
            ["\\(", "\\)"],
            ["$`", "`$"]
        ],
        displayMath: [
            ["\\[", "\\]"],
            ["```math\n", "\n```"]
        ]
    },
    options: {
        enableMenu: false
    }
};

(function () {
    let script = document.createElement("script");
    script.src = "libs/tex-svg-full.js";
    script.async = true;
    document.head.appendChild(script);
})();
