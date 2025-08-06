/*
 * Copyright (C) 2025 red.ornob [https://github.com/red-ornob] <red.ornob.dev@gmail.com>
 * This program is subject to the AGPL-3.0-or-later licence.
 * Check NOTICE.md at the project root for the full notice.
 */

'use strict';

const fs = require('fs');
const path = require('path');

async function loadTheme(themePath) {
    try {
        const response = await fetch(`./${themePath}`);
        const css = await response.text();
        
        const oldStyle = document.getElementById('codestyle');
        if (oldStyle) document.head.removeChild(oldStyle);
        
        const style = document.createElement('style');
        style.id = 'codestyle';
        style.textContent = css;
        
        document.head.appendChild(style);
    } catch (err) {
        console.error('Failed to load theme:', err);
    }
}

function getFilesRelative(dir) {
    const absoluteDir = path.resolve(dir);
    const files = [];
    
    function walk(currentDir) {
        const entries = fs.readdirSync(currentDir, { withFileTypes: true });
        
        const cwd = process.cwd()
        for (const entry of entries) {
            const fullPath = path.join(currentDir, entry.name);
            const relativePath = path.relative(cwd, fullPath);
            
            if (entry.isDirectory()) {
                walk(fullPath);
            } else if (entry.isFile()) {
                files.push(relativePath);
            }
        }
    }
    
    walk(absoluteDir);
    return files;
}

document.addEventListener("DOMContentLoaded", () => {
    const files = getFilesRelative('./styles/codestyles/');
    if (files.length === 0) {
        console.log("No codestyles found.")
        return;
    }
    
    let select = document.querySelector("select#codestyle-select")
    files.forEach((file) => {
        let option = document.createElement("option");
        option.innerText = file.split("/").pop();
        option.value = file;
        select.appendChild(option);
    })
    
    select.addEventListener('change', async (event) => {
        await loadTheme(event.target.value);
    })
});
