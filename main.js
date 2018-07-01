// declare imports
const {app, BrowserWindow} = require('electron')

// global reference to app window
let win

/**
 * Create the app window
 */
function createWindow() {
    // create a browser and load the main page
    win = new BrowserWindow({
        width: 1046, 
        height: 684,
        center: true
    })
    win.loadFile('index.html')

    // dereference window when closed
    win.on('closed', () => {
        win = null
    })
}

// wait for electron to be initialized
app.on('ready', createWindow)

// quit when all windows are closed
app.on('window-all-closed', () => {
    // stay active on os x systems
    if (process.platform !== 'darwin') app.quit()
})

// recreate window when closed yet active on os x
app.on('activate', () => {
    if (win == null) createWindow()
})