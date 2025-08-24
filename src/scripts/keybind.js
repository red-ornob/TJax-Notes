/*
 * Copyright (C) 2025 red.ornob [https://github.com/red-ornob] <red.ornob.dev@gmail.com>
 * This program is subject to the AGPL-3.0-or-later licence.
 * Check NOTICE.md at the project root for the full notice.
 */

'use strict';

import config from "./userdata.js";
console.log(config);

function bind({code, ctrl, shift, alt}, func) {
    document.addEventListener('keyup',
        (e) => {
            if ((!ctrl || e.ctrlKey) && 
                (!shift || e.shiftKey) &&
                (!alt || e.altKey) && 
                e.code === code) {
                func()
            }
        },
        false);
}

document.addEventListener('DOMContentLoaded', () => {
    const page = document.URL.split("/").pop().split(".")[0];
    
    if (page === "editor") {
        bind({
            code: "KeyV",
            ctrl: false,
            shift: false,
            alt: true,
        }, toggleViewer);

        bind({
            code: "KeyS",
            ctrl: true,
            shift: false,
            alt: false,
        }, saveFile);

        bind({
            code: "KeyO",
            ctrl: true,
            shift: false,
            alt: false,
        }, openFile);
    }
})

function toggleViewer() {
    const viewer = document.querySelector('#viewer');
    const editor = document.querySelector('#editor');
    if (viewer.style.display === "none") {
        viewer.style.display = "block";
        editor.style.width = "49%";
    } else {
        viewer.style.display = "none";
        editor.style.width = "98.9vw";
    }
}

function saveFile() {
    alert("TODO")
}

function openFile() {
    alert("TODO")
}
