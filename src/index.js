/*
 * Copyright (C) 2025 red.ornob [https://github.com/red-ornob] <red.ornob.dev@gmail.com>
 * This program is subject to the AGPL-3.0-or-later licence.
 * Check NOTICE.md at the project root for the full notice.
 */

"use strict";

const { init } = require('scripts/init');

init()
    .catch((err) => {
    alert("Error while initialising\n" + err);
})
    .then(() => {
    // noinspection JSUnresolvedReference
    nw.Window.open("index.html");
});
