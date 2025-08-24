/*
 * Copyright (C) 2025 red.ornob [https://github.com/red-ornob] <red.ornob.dev@gmail.com>
 * This program is subject to the AGPL-3.0-or-later licence.
 * Check NOTICE.md at the project root for the full notice.
 */

'use strict';

const fs = require('fs').promises;
const path = require('path');
const os = require('os');

async function getConfig() {
    const configPaths = {
        win32: path.join(os.homedir(), 'AppData', 'Local', 'tjax', 'userdata'),
        darwin: path.join(os.homedir(), 'Library', 'Application Support', 'tjax', 'userdata'),
        linux: path.join(os.homedir(), '.config', 'tjax', 'userdata'),
    };
    
    const configFile = path.join(configPaths[os.platform()] || configPaths.linux, 'config.json');
    
    try {
        const configString = await fs.readFile(configFile, 'utf8')
        return JSON.parse(configString);
    } catch(err) {
        alert("Error getting config\n" + err);
    }
}
 
const config = await getConfig();

export default config
