// declare imports
const {app, BrowserWindow, ipcMain, Tray} = require('electron')

// retain global references
let win
let tray

/**
 * Create app tray
 */
function createTray() {
    // TODO
}

/**
 * Create the app window
 */
function createWindow() {
    // create a browser and load the main page
    win = new BrowserWindow({
        width: 1046, 
        height: 684,
        center: true,
        title: 'Slumber',
        resizable: false
    })
    win.setMenu(null)
    win.loadFile('index.html')

    // Open the DevTools.
    win.webContents.openDevTools()

    // dereference window when closed
    win.on('closed', () => {
        win = null
    })
}

// wait for electron to be initialized
app.on('ready', () => {
    createTray()
    createWindow()
})

// quit when all windows are closed
app.on('window-all-closed', () => {
    // stay active on os x systems
    // if (process.platform !== 'darwin') app.quit()
})

// recreate window when closed yet active on os x
app.on('activate', () => {
    if (win == null) createWindow()
})