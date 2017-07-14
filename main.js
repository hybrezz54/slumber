const electron = require('electron')

const path = require('path')
const url = require('url')

// Global reference of window object
let mainWindow

// create the app window
function createWindow() {
    // create browser window
    mainWindow = new BrowserWindow({width: 800, height: 600})

    // load app's index.html
    mainWindow.loadURL(url.format({
        pathname: path.join(__dirname, 'index.html'),
        protocol: 'file:',
        slashes: true
    }))

    // Callback for window close
    mainWindow.on('closed', () => {
        // Dereference the window object
        mainWindow = null
    })
}

// Callback for window init
app.on('ready', createWindow)

// Quit when all windows are closed
app.on('window-all-closed', function() {
    // Quit app fully on OS X
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

// Callback method
app.on('activate', function() {
    // Common on OS X for app to be open without window
    if (mainWindow === null) {
        createWindow()
    }
})