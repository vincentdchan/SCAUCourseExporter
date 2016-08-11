import {app, BrowserWindow, ipcMain} from "electron"
import {readFile} from "fs"
import {RawCourseData, RawCourse} from "./course"
import {cookCourse} from "./util"

let main_wn
let zf_hd
let zf_lk = false

function createWindow() {
    main_wn = new BrowserWindow({width: 800, height: 600});

    main_wn.loadURL(`file://${__dirname}/../views/index.html`);

    main_wn.webContents.openDevTools();

    main_wn.on('closed', () => {
        main_wn = null;
    });

}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('active', () => {
    if (main_wn = null) {
        createWindow();
    }
})

let hook_courses_senders = []

ipcMain.on('hook-courses', (evt: any, ...arg: any[]) => {
    hook_courses_senders.push(evt.sender)
})

ipcMain.on('open-zf-link', function(evt: any, ...arg: any[]) {
    if (zf_lk)
        return;
    
    zf_lk = true
    var link = <string>arg[0]

    let child = new BrowserWindow()
    zf_hd = child;

    child.loadURL(link)

    var content = child.webContents;

    child.once('ready-to-show', () => {
        child.show()
    })

    child.on('closed', () => {
        child = null;
        zf_lk = false
    })

    content.on('did-finish-load', () => {
        readFile(__dirname + '/render/inject.js', 'utf-8', (err: Error, data: string) => {
            if (!err) {
                content.executeJavaScript(data);
            } else
                console.log(err);
        })
    })
    
})

ipcMain.on('zf-redirect', function (evt: any, ...arg: any[]) {
    var link = <string>arg[0];
    zf_hd.loadURL(link);
})

ipcMain.on('zf-raw-course-data', function (evt: any, ...arg: any[]) {
    var raw_courses = <RawCourseData>arg[0]
    var _cooked = cookCourse(raw_courses);

    for (var i=0; i < hook_courses_senders.length; ++i) {
        hook_courses_senders[i].send('render-courses', _cooked)
    }

    zf_hd.close()
    zf_hd = null
})
