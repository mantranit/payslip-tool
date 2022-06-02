const path = require('path');
// include fs-extra package
var fs = require("fs-extra");

const PYTHON_DIR = path.resolve(__dirname, './python');
const PYTHON_DES_DIR = path.resolve(__dirname, './out/payslip-app-win32-x64/python');

// 3. Copy source folder to destination
fs.copy(PYTHON_DIR, PYTHON_DES_DIR, function (err) {
    if (err){
        console.log('An error occured while copying the folder.')
        return console.error(err)
    }
    console.log('Copy completed!')
});
