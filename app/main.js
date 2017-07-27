// init app constants
const electron = require('electron')
const BrowserWindow = electron.BrowserWindow
const app = electron.app
const Menu = electron.menu
const globalShortcut = electron.globalShortcut
const ipc = electron.ipcMain

// terminal or cmd dependency
const exec = require('child_process').exec

// init file constants
const path = require('path')
const url = require('url')

// Global variables
let mainWindow
let appMenu

// create the app window
function createWindow() {
    // create browser window
    mainWindow = new BrowserWindow({
        title: 'Slumber',
        backgroundColor: "#7f165c",
        width: 400,
        height: 200,
        show: false,
        frame: false,
        resizable: false
    })

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

    // Event for ready to show app
    mainWindow.once('ready-to-show', () => {
        mainWindow.show()
        mainWindow.focus()
    })
}

// Callback for window init
app.on('ready', () => {
    //create app window
    createWindow()

    // register keyboard shortcuts
    globalShortcut.register('CommandOrControl+Y', cancelShutdown)
    globalShortcut.register('CommandOrControl+Z', toggleMinimized)
})

// Quit when all windows are closed
app.on('window-all-closed', () => {
    // Quit app fully on OS X
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

// Callback method
app.on('activate', () => {
    // Common on OS X for app to be open without window
    if (mainWindow === null) {
        createWindow()
    }
})

ipc.on('close-main', (event, arg) => {
    app.quit()
})

// Shutdown event
function shutdown() {
    switch(process.platform) {
        case 'win32':
            exec('shutdown /s')
        break
        default:
            exec('sudo shutdown -h now')
    }
}

// Callback for shutdown shortcut event
function cancelShutdown() {
    switch(process.platform) {
        case 'win32':
            exec('shutdown /a')
        break
        default:
            exec('sudo shutdown -c')
    }
}

// Callback for window state shortcut event
function toggleMinimized() {
    if (mainWindow.isMinimized())
        mainWindow.restore()
    else
        mainWindow.minimize()
}