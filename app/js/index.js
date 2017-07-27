const $ = jQuery = require('jquery')
const bootstrap = require('bootstrap')

const electron = require('electron')
const ipc = electron.ipcRenderer

$('.close').click(() => {
    ipc.sendSync('close-main')
})