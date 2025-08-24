/*
 * Copyright (C) 2025 red.ornob [https://github.com/red-ornob] <red.ornob.dev@gmail.com>
 * This program is subject to the AGPL-3.0-or-later licence.
 * Check NOTICE.md at the project root for the full notice.
 */

const fs = require('fs').promises;
const path = require('path');
const os = require('os');

export async function init() {
    const configPaths = {
        win32: path.join(os.homedir(), 'AppData', 'Local', 'tjax', 'userdata'),
        darwin: path.join(os.homedir(), 'Library', 'Application Support', 'tjax', 'userdata'),
        linux: path.join(os.homedir(), '.config', 'tjax', 'userdata')
    };

    const configJson = {
        notesDir: path.join(os.homedir(), 'Notes'),
        theme: 'pop.css'
    }
    
    const platform = os.platform();
    const configDir = configPaths[platform] || configPaths.linux;
    
    let filePath = path.join(configDir, 'config.json');
    try{
        await fs.access(filePath, fs.constants.R_OK | fs.constants.W_OK);
        updateConfig(filePath, configJson)
            .catch((err) => {
            alert("Error while updating config file\n" + err);
        });
    } catch {
        createConfig(filePath, configJson)
            .catch((err) => {
            alert("Error while creating config file\n" + err);
        });
    }
}

async function createConfig(filePath, configJson) {
    configJson.notesDir = path.join(os.homedir(),
        prompt(`Notes Folder\nRelative from ${os.homedir()}/`) || 'Notes');
    
    try {
        await writeFile(filePath, JSON.stringify(configJson, null, 2));
    } catch (err) {
        alert("Error while creating config file\n" + err);
    }
    
    await ensureDirectoryExists(configJson.notesDir);
}

async function updateConfig(filePath, configJson) {
    try {
        const savedConfigString = await fs.readFile(filePath, 'utf-8');
        
        let savedConfigJson = JSON.parse(savedConfigString)
        
        Object.keys(configJson).forEach(newConfig => {
            if (!savedConfigJson.hasOwnProperty(newConfig)) {
                switch (newConfig) {
                    case 'notesDir':
                        savedConfigJson[newConfig] = path.join(os.homedir(), 
                            prompt(`Notes Folder\nRelative from ${os.homedir()}/`) || 'Notes')
                        break;
                    default:
                        savedConfigJson[newConfig] = configJson[newConfig];
                        break;
                }
            }
        });
        
        await writeFile(filePath, JSON.stringify(savedConfigJson, null, 2));
        
        await ensureDirectoryExists(savedConfigJson.notesDir);
    
    } catch (err) {
        alert("Error while updating config file\n" + err);
    }
}

async function ensureDirectoryExists(dir) {
    try {
        await fs.mkdir(dir, { recursive: true });
    } catch (error) {
        if (error.code !== 'EEXIST') { // Ignore if directory already exists
            throw error;
        }
    }
}

async function writeFile(filePath, content) {
    await ensureDirectoryExists(path.dirname(filePath));
    await fs.writeFile(filePath, content, "utf-8");
}
