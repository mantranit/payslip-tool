// 1. Import Modules
const { MSICreator } = require('electron-wix-msi');
const path = require('path');
// include fs-extra package
var fs = require("fs-extra");

// 2. Define input and output directory.
// Important: the directories must be absolute, not relative e.g
const APP_DIR = path.resolve(__dirname, './out/payslip-app-win32-x64');
const OUT_DIR = path.resolve(__dirname, './out');
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

// 4. Instantiate the MSICreator
const msiCreator = new MSICreator({
    appDirectory: APP_DIR,
    outputDirectory: OUT_DIR,

    // Configure metadata
    description: 'This is an application to serve compressed pdf files and then send the email.',
    exe: 'payslip-app',
    name: 'Payslip App',
    manufacturer: 'Man Tran',
    version: '0.1.0',
    arch: 'x64',
    bundled: true,
    // Configure installer User Interface
    ui: {
        chooseDirectory: true
    },
});

// 5. Create a .wxs template file
msiCreator.create().then(function(){
    // Step 5: Compile the template to a .msi file
    msiCreator.compile();
});