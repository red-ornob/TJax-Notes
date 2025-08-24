/*
 * Copyright (C) 2025 red.ornob [https://github.com/red-ornob] <red.ornob.dev@gmail.com>
 * This program is subject to the AGPL-3.0-or-later licence.
 * Check NOTICE.md at the project root for the full notice.
 */

'use strict';

const fs = require('fs').promises;
const path = require('path');
import config from './userdata.js';

export async function file_view(render_func) {
    const files = await getFiles(config.notesDir)

    const treeContainer = document.getElementById("file-tree");

    const dirName = document.createElement("summary")
    dirName.innerText = config.notesDir.split("/").pop();
    treeContainer.append(dirName);

    const tree = document.createElement("ul")
    tree.style.listStyleType = "none";
    treeContainer.append(tree)
    
    populateTree(files, tree);

    const viewer = document.querySelector('#viewer');
    document.getElementById('file-tree').addEventListener('click', async (event) => {
        if (event.target.classList.contains('file-btn')) {
            try {
                render_func(await fs.readFile(event.target.value, "utf8"));
            } catch (error) {
                alert("Error loading file\n" + error);
            }
        }
    });
}

async function getFiles(dir) {
    const tree = {}
    
    try{
        const items = await fs.readdir(dir, { withFileTypes: true });
        for (const item of items) {
            const fullpath = path.join(dir, item.name)
            if (item.isDirectory()) {
                tree[item.name] = await getFiles(fullpath)
            }
            else if (item.isFile()) {
                tree[item.name] = fullpath; 
            }
        }
    } catch (error) {
        alert("Error while populating file-tree\n" + error);
    }
    
    return tree;
}

function populateTree(tree, element) {
    for (const [name, value] of Object.entries(tree)) {
        
        if (typeof value === 'object' && value !== null) {
            const treeContainer = document.createElement("details");
            element.append(treeContainer);
            
            const dirName = document.createElement("summary");
            dirName.innerText = name;
            treeContainer.append(dirName);

            const subTree = document.createElement("ul")
            subTree.style.listStyleType = "none";
            treeContainer.append(subTree)
            
            populateTree(value, subTree);
        
        } else if (typeof value === 'string') {
            const file = document.createElement("li");
            const button = document.createElement("button");
            button.className = "file-btn";
            button.textContent = name;
            button.value = value;
            file.append(button);
            element.append(file);
        }
    }
}
