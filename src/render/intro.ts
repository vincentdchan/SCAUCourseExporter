import {ipcRenderer} from 'electron'
import {Course} from '../course'
const jsrender = require('jsrender')
const link_input = <HTMLInputElement>document.querySelector("#link_input")
const open_wn_btn = <HTMLButtonElement>document.querySelector('#open_wn_btn')
const script_tmpl = <HTMLScriptElement>document.querySelector("#RawCourseTemplate")
const tmpl = jsrender.templates(script_tmpl.innerHTML)

link_input.value = "http://202.116.160.170/"

open_wn_btn.addEventListener('click', function(evt: Event) {
    var _val = link_input.value;
    ipcRenderer.send('open-zf-link', _val);
})

ipcRenderer.send('hook-courses')

ipcRenderer.on('render-courses', (evt: any, ...arg: any[]) => {
    var courses = <Array<Course>>arg[0]
    const course_elm = <HTMLDivElement>document.querySelector("#course_data")
    console.log(courses);
    var html = tmpl.render(courses);
    course_elm.innerHTML = html

    var export_btn = <HTMLButtonElement>document.createElement("button")
    course_elm.appendChild(export_btn)
    export_btn.innerText = "Export to iCal file"
    export_btn.addEventListener('click', (evt: MouseEvent) => {
        evt.preventDefault()
        ipcRenderer.send('export-courses', courses)
        export_btn.innerText = "Exporting..."
    })
})
