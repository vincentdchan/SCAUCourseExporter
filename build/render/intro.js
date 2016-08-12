"use strict";
const electron_1 = require('electron');
const jsrender = require('jsrender');
const link_input = document.querySelector("#link_input");
const open_wn_btn = document.querySelector('#open_wn_btn');
const raw_courses_tmpl_elm = document.querySelector("#RawCourseTemplate");
const date_input_tmpl_elm = document.querySelector("#DateInputTemplate");
// const input_date = <HTMLInputElement>document.querySelector("#input-date")
const tmpl = jsrender.templates(raw_courses_tmpl_elm.innerHTML);
const date_input_tmpl = jsrender.templates(date_input_tmpl_elm.innerHTML);
link_input.value = "http://202.116.160.170/";
function init() {
    var current = new Date();
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
    const datepicker_container = document.createElement("div");
    var datepicker_html = date_input_tmpl.render();
    var html = tmpl.render(courses);
    course_elm.innerHTML = html;
    datepicker_container.innerHTML = datepicker_html;
    export_btn = document.createElement("button");
    course_elm.appendChild(datepicker_container);
    course_elm.appendChild(export_btn);
    export_btn.innerText = "Export to iCal file";
    export_btn.addEventListener('click', (evt) => {
        evt.preventDefault();
        const input_date = document.querySelector("#input-date");
        var new_date = new Date(input_date.value);
        if (new_date.getDay() === 1) {
            electron_1.ipcRenderer.send('export-courses', courses, new_date);
            export_btn.innerText = "Exporting...";
        }
        else {
            alert("Error! The day should be Monday");
        }
    });
});
electron_1.ipcRenderer.on('export-finished', (evt, arg) => {
    export_btn.innerText = "Export finished";
});
