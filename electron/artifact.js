// 1. Import Modules
const pjson = require('./package.json');
const { MSICreator } = require('electron-wix-msi');
const path = require('path');

// 2. Define input and output directory.
// Important: the directories must be absolute, not relative e.g
const APP_DIR = path.resolve(__dirname, `./out/${pjson.name}-win32-x64`);
const OUT_DIR = path.resolve(__dirname, './out');

// 3. Instantiate the MSICreator
const msiCreator = new MSICreator({
    appDirectory: APP_DIR,
    outputDirectory: OUT_DIR,

    // Configure metadata
    description: pjson.description,
    exe: pjson.name,
    name: 'Payslip App',
    manufacturer: pjson.author,
    version: pjson.version,
    arch: 'x64',
    autoLaunch: true,
    // Configure installer User Interface
    ui: {
        chooseDirectory: true
    },
});

// 4. Create a .wxs template file
msiCreator.create().then(function(){
    // Step 5: Compile the template to a .msi file
    msiCreator.compile();
});