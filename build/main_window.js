"use strict";
const electron_1 = require("electron");
// let win;
let intro_win;
let win_handle;
function createIntroWindow() {
    var intro = new electron_1.BrowserWindow({ width: 600, height: 200 });
    intro.loadURL(`file://${__dirname}/../views/intro.html`);
    intro.webContents.openDevTools();
    intro.on('closed', () => {
        win_handle = null;
    });
    win_handle = intro;
}
function createWindow() {
    var win = new electron_1.BrowserWindow({ width: 800, height: 600 });
    win.loadURL(`http://www.baidu.com`);
    win.webContents.openDevTools();
    win.on('closed', () => {
        win_handle = null;
    });
    win_handle = win;
}
//app.on('ready', createWindow);
electron_1.app.on('ready', createIntroWindow);
electron_1.app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        electron_1.app.quit();
    }
});
electron_1.app.on('active', () => {
    if (win_handle = null) {
        createIntroWindow();
    }
});
