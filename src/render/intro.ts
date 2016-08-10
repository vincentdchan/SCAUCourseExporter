import {ipcRenderer} from 'electron'
import {RawCourse, RawCourseData} from '../course'
const jsrender = require('jsrender')
const link_input = <HTMLInputElement>document.querySelector("#link_input")
const open_wn_btn = <HTMLButtonElement>document.querySelector('#open_wn_btn')
const tmpl = jsrender.templates("#RawCourseTemplate")

link_input.value = "http://202.116.160.170/"

open_wn_btn.addEventListener('click', function(evt: Event) {
    var _val = link_input.value;
    ipcRenderer.send('open-zf-link', _val);
})

ipcRenderer.send('hook-courses')

ipcRenderer.on('render-courses', (evt: any, ...arg: any[]) => {
    var courses = <RawCourseData>arg[0]
    console.log(courses)
})
