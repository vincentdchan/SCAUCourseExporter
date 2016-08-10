"use strict";
const electron_1 = require('electron');
const jsrender = require('jsrender');
const link_input = document.querySelector("#link_input");
const open_wn_btn = document.querySelector('#open_wn_btn');
const tmpl = jsrender.templates("#RawCourseTemplate");
link_input.value = "http://202.116.160.170/";
open_wn_btn.addEventListener('click', function (evt) {
    var _val = link_input.value;
    electron_1.ipcRenderer.send('open-zf-link', _val);
});
electron_1.ipcRenderer.send('hook-courses');
electron_1.ipcRenderer.on('render-courses', (evt, ...arg) => {
    var courses = arg[0];
    console.log(courses);
});
