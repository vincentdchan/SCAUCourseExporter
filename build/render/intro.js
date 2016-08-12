"use strict";
const electron_1 = require('electron');
const jsrender = require('jsrender');
const link_input = document.querySelector("#link_input");
const open_wn_btn = document.querySelector('#open_wn_btn');
const script_tmpl = document.querySelector("#RawCourseTemplate");
const input_year = document.querySelector("#input-year");
const input_month = document.querySelector("#input-month");
const input_day = document.querySelector("#input-day");
const tmpl = jsrender.templates(script_tmpl.innerHTML);
link_input.value = "http://202.116.160.170/";
function init() {
    var current = new Date();
    input_year.value = current.getFullYear().toString();
    input_month.value = (current.getMonth() + 1).toString();
    input_day.value = current.getDate().toString();
}
init();
open_wn_btn.addEventListener('click', function (evt) {
    var _val = link_input.value;
    electron_1.ipcRenderer.send('open-zf-link', _val);
});
electron_1.ipcRenderer.send('hook-courses');
electron_1.ipcRenderer.send('hook-export');
var export_btn;
electron_1.ipcRenderer.on('render-courses', (evt, ...arg) => {
    var courses = arg[0];
    const course_elm = document.querySelector("#course_data");
    var html = tmpl.render(courses);
    course_elm.innerHTML = html;
    export_btn = document.createElement("button");
    course_elm.appendChild(export_btn);
    export_btn.innerText = "Export to iCal file";
    export_btn.addEventListener('click', (evt) => {
        evt.preventDefault();
        var new_date = new Date();
        new_date.setFullYear(parseInt(input_year.value));
        new_date.setMonth(parseInt(input_month.value) - 1);
        new_date.setDate(parseInt(input_day.value));
        electron_1.ipcRenderer.send('export-courses', courses, new_date);
        export_btn.innerText = "Exporting...";
    });
});
electron_1.ipcRenderer.on('export-finished', (evt, arg) => {
    export_btn.innerText = "Export finished";
});
