/*
 * Copyright (C) 2025 red.ornob [https://github.com/red-ornob] <red.ornob.dev@gmail.com>
 * This program is subject to the AGPL-3.0-or-later licence.
 * Check NOTICE.md at the project root for the full notice.
 */

'use strict';

const fs = require('fs').promises;
const path = require('path');
import config from './userdata.js';

export async function file_tree() {
    const files = await getFiles(config.notesDir)

    const div = document.getElementById("file-tree");

    const root = document.createElement("ul")
    root.style.all = "unset";
    root.style.listStyleType = "none";
    div.append(root)
    
    const treeContainer = document.createElement("details");
    treeContainer.open = true;
    root.append(treeContainer);

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
                viewer.innerHTML = await fs.readFile(event.target.dataset.path, "utf8");
                viewer.dispatchEvent(new InputEvent("input", {}));
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
            dirName.innerText = name + '/';
            treeContainer.append(dirName);

            const subTree = document.createElement("ul")
            subTree.style.listStyleType = "none";
            treeContainer.append(subTree)
            
            populateTree(value, subTree);
        
        } else if (typeof value === 'string') {
            const file = document.createElement("li");
            file.className = "file-btn";
            file.value
            file.textContent = name;
            file.dataset.path = value;
            // file.append(button);
            element.append(file);
        }
    }
}
