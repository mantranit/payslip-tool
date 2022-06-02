// 1. Import Modules
const pjson = require('./package.json');
const path = require('path');
// include fs-extra package
const fs = require("fs-extra");

// 2. Define input and output directory.
// Important: the directories must be absolute, not relative e.g
const PYTHON_DIR = path.resolve(__dirname, './python');
const PYTHON_DES_DIR = path.resolve(__dirname, `./out/${pjson.name}-win32-x64/python`);

// 3. Copy source folder to destination
fs.copy(PYTHON_DIR, PYTHON_DES_DIR, function (err) {
    if (err){
        console.log('An error occured while copying the folder.')
        return console.error(err)
    }
    console.log('Copy completed!')
});
