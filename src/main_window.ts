import {app, BrowserWindow} from "electron"

// let win;
let intro_win;
let win_handle;

function createIntroWindow() {
    var intro = new BrowserWindow({width: 600, height: 200});
    intro.loadURL(`file://${__dirname}/../views/intro.html`);

    intro.webContents.openDevTools();

    intro.on('closed', () => {
        win_handle = null;
    })

    win_handle = intro;
}

function createWindow() {
    var win = new BrowserWindow({width: 800, height: 600});

    win.loadURL(`http://www.baidu.com`);

    win.webContents.openDevTools();

    win.on('closed', () => {
        win_handle = null;
    });

    win_handle = win;
}

//app.on('ready', createWindow);
app.on('ready', createIntroWindow);

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('active', () => {
    if (win_handle = null) {
        createIntroWindow();
    }
})
