/*
 * Copyright (C) 2025 red.ornob [https://github.com/red-ornob] <red.ornob.dev@gmail.com>
 * This program is subject to the AGPL-3.0-or-later licence.
 * Check NOTICE.md at the project root for the full notice.
 */

const fs = require('fs').promises;
const path = require('path');
const os = require('os');
const {isArgumentsObject} = require("node:util/types");

export async function init() {
    const configPaths = {
        win32: path.join(os.homedir(), 'AppData', 'Roaming', 'markx'),
        darwin: path.join(os.homedir(), '.config', 'markx'),
        linux: path.join(os.homedir(), '.config', 'markx')
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
        await fs.writeFile(filePath, JSON.stringify(configJson, null, 2), "utf-8");
    } catch (err) {
        alert("Error while creating config file\n" + err);
    }
}

async function updateConfig(filePath, configJson) {
    try {
        const oldConfigString = await fs.readFile(filePath, 'utf-8');
        
        let oldConfigJson = JSON.parse(oldConfigString)
        
        Object.keys(configJson).forEach(newConfig => {
            if (!oldConfigJson.hasOwnProperty(newConfig)) {
                switch (newConfig) {
                    case 'notesDir':
                        oldConfigJson[newConfig] = path.join(os.homedir(), 
                            prompt(`Notes Folder\nRelative from ${os.homedir()}/`) || 'Notes')
                        break;
                    default:
                        oldConfigJson[newConfig] = configJson[newConfig];
                        break;
                }
            }
        });
        
        await fs.writeFile(filePath, JSON.stringify(oldConfigJson, null, 2), "utf-8");

    } catch (err) {
        alert("Error while updating config file\n" + err);
    }
}
