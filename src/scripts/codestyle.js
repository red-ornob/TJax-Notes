/*
 * Copyright (C) 2025 red.ornob [https://github.com/red-ornob] <red.ornob.dev@gmail.com>
 * This program is subject to the AGPL-3.0-or-later licence.
 * Check NOTICE.md at the project root for the full notice.
 */

'use strict';

const fs = require('fs');
const path = require('path');

function createSymlink(target, destination) {
    try {
        const absTarget = path.resolve(target);
        const absDestination = path.resolve(destination);
        
        // Calculate the relative path FROM the symlink location TO the target
        const relativePath = path.relative(path.dirname(absDestination), absTarget);
        
        
        // Remove existing symlink/file/directory if it exists
        try {
            fs.unlinkSync(destination); // This works for symlinks and files
        } catch (unlinkErr) {
            if (unlinkErr.code === 'ENOENT') {
                // Doesn't exist - that's fine
            } else if (unlinkErr.code === 'EPERM') {
                // Might be a directory on Windows
                fs.rmdirSync(destination, { recursive: true });
            } else {
                console.error(unlinkErr);
                return
            }
        }
        
        // Create the symlink
        fs.symlinkSync(relativePath, destination);
        
    } catch (err) {
        console.error(err);
    }
}

function getFilesRelative(dir) {
    const absoluteDir = path.resolve(dir);
    const files = [];

    function walk(currentDir) {
        const entries = fs.readdirSync(currentDir, { withFileTypes: true });

        for (const entry of entries) {
            const fullPath = path.join(currentDir, entry.name);
            const relativePath = path.relative(process.cwd(), fullPath);

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

// Example usage:
const files = getFilesRelative('./src');
let select = document.querySelector("select")
files.forEach((file) => {
    select.options.add(file);
})
select.addEventListener('select', (event) => {
    console.log(event.target.value);
})
