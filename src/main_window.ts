import {app, BrowserWindow} from "electron"

// let win;
let win;

function createWindow() {
    win = new BrowserWindow({width: 800, height: 600});

    win.loadURL(`http://www.baidu.com`);

    win.webContents.openDevTools();

    win.on('closed', () => {
        win = null;
    });
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('active', () => {
    if (win = null) {
        createWindow();
    }
})

async function delay(milliseconds: number) {
    return new Promise(resolve => {
        setTimeout(resolve, milliseconds);
    });
}