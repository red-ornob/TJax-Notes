/*
 * Copyright (C) 2025 red.ornob [https://github.com/red-ornob] <red.ornob.dev@gmail.com>
 * This program is subject to the AGPL-3.0-or-later licence.
 * Check NOTICE.md at the project root for the full notice.
 */

'use strict';

const fs =  require('fs').promises;
const path = require('path');
import config from "./userdata.js";

function set_keybinds() {
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

    bind({
        code: "Digit1",
        ctrl: false,
        shift: false,
        alt: true,
    }, goHome);

    bind({
        code: "Digit2",
        ctrl: false,
        shift: false,
        alt: true,
    }, goView);

    bind({
        code: "Digit3",
        ctrl: false,
        shift: false,
        alt: true,
    }, goEdit);

        bind({
        code: "Enter",
        ctrl: false,
        shift: false,
        alt: true,
    }, toggleFullscreen);
}

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

function toggleViewer() {
    const viewer = document.querySelector('#viewer');
    const editor = document.querySelector('#editor');
    if (viewer.style.display === "none") {
        viewer.style.display = "block";
    } else {
        viewer.style.display = "none";
    }
}

async function saveFile() {
    const content = document.querySelector('#editor').value;
    const filename = document.querySelector('#title').value;
    
    if (!filename) {
        alert("Note needs a name.")
        return;
    }
    
    const filepath = path.join(config.notesDir, filename + ".tjx");
    await fs.writeFile(filepath, content, "utf8")
}

function openFile() {
    const editor = document.querySelector('#editor');
    const title = document.querySelector('#title');
    
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.tjx,.txt';
    
    input.onchange = async (event) => {
        const file = event.target.files[0];
        title.value = file.name.split(".")[0];
        editor.value = await fs.readFile(file.path, "utf8");
        editor.dispatchEvent(new InputEvent("input", {}));
    };
    
    input.click();
}

function goHome() {
    document.location.href = "index.html";
}

function goView() {
    document.location.href = "viewer.html";
}

function goEdit() {
    document.location.href = "editor.html";
}

function toggleFullscreen() {
    nw.Window.get().toggleFullscreen()
}

set_keybinds();
