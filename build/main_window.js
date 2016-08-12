"use strict";
const electron_1 = require("electron");
const util_1 = require("./util");
const icalgen_1 = require("./icalgen");
const fs = require("fs");
let main_wn;
let zf_hd;
let zf_lk = false;
function createWindow() {
    main_wn = new electron_1.BrowserWindow({ width: 800, height: 600 });
    main_wn.loadURL(`file://${__dirname}/../views/index.html`);
    main_wn.on('closed', () => {
        main_wn = null;
    });
}
electron_1.app.on('ready', createWindow);
electron_1.app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        electron_1.app.quit();
    }
});
electron_1.app.on('active', () => {
    if (main_wn = null) {
        createWindow();
    }
});
let hook_courses_senders = [];
electron_1.ipcMain.on('hook-courses', (evt, ...arg) => {
    hook_courses_senders.push(evt.sender);
});
electron_1.ipcMain.on('open-zf-link', function (evt, ...arg) {
    if (zf_lk)
        return;
    zf_lk = true;
    var link = arg[0];
    let child = new electron_1.BrowserWindow();
    zf_hd = child;
    child.loadURL(link);
    var content = child.webContents;
    child.once('ready-to-show', () => {
        child.show();
    });
    child.on('closed', () => {
        child = null;
        zf_lk = false;
    });
    content.on('did-finish-load', () => {
        fs.readFile(__dirname + '/render/inject.js', 'utf-8', (err, data) => {
            if (!err) {
                content.executeJavaScript(data);
            }
            else
                console.log(err);
        });
    });
});
electron_1.ipcMain.on('zf-redirect', (evt, ...arg) => {
    console.assert(arg.length > 0);
    var link = arg[0];
    zf_hd.loadURL(link);
});
electron_1.ipcMain.on('zf-raw-course-data', (evt, ...arg) => {
    console.assert(arg.length > 0);
    var raw_courses = arg[0];
    var _cooked = util_1.cookCourse(raw_courses);
    for (var i = 0; i < hook_courses_senders.length; ++i) {
        hook_courses_senders[i].send('render-courses', _cooked);
    }
    zf_hd.close();
    zf_hd = null;
});
var hook_export_senders = [];
electron_1.ipcMain.on('hook-export', (evt, ...arg) => {
    hook_export_senders.push(evt.sender);
});
electron_1.ipcMain.on('export-courses', (evt, ...arg) => {
    console.assert(arg.length >= 2);
    var courses = arg[0];
    var start;
    if (arg[1] instanceof Date)
        start = arg[1];
    else
        start = new Date(arg[1]);
    var cal = util_1.createCalendar(courses, start);
    var iter = icalgen_1.calendarGen(cal);
    fs.open("output.ics", "w", (err, fd) => {
        function _fuck() {
            var buf = iter.next();
            if (buf.done) {
                fs.close(fd);
                for (var i = 0; i < hook_export_senders.length; ++i)
                    hook_export_senders[i].send('export-finished');
                return;
            }
            fs.write(fd, buf.value, _fuck);
        }
        if (!err) {
            _fuck();
        }
    });
});
