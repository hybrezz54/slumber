// Show the current time
let d = new Date()
let time = d.getHours() + ':' + d.getMinutes()
document.getElementById('time').appendChild(document.createTextNode(time))