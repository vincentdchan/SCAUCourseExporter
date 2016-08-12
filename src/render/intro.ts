import {ipcRenderer} from 'electron'
import {Course} from '../course'
const jsrender = require('jsrender')
const link_input = <HTMLInputElement>document.querySelector("#link_input")
const open_wn_btn = <HTMLButtonElement>document.querySelector('#open_wn_btn')
const script_tmpl = <HTMLScriptElement>document.querySelector("#RawCourseTemplate")
const input_year = <HTMLInputElement>document.querySelector("#input-year")
const input_month = <HTMLInputElement>document.querySelector("#input-month")
const input_day = <HTMLInputElement>document.querySelector("#input-day")
const tmpl = jsrender.templates(script_tmpl.innerHTML)

link_input.value = "http://202.116.160.170/"

function init() {
    var current = new Date();

    input_year.value = current.getFullYear().toString();
    input_month.value = (current.getMonth() + 1).toString();
    input_day.value = current.getDate().toString();
}

init()


open_wn_btn.addEventListener('click', function(evt: Event) {
    var _val = link_input.value;
    ipcRenderer.send('open-zf-link', _val);
})

ipcRenderer.send('hook-courses')
ipcRenderer.send('hook-export')

var export_btn: HTMLButtonElement
ipcRenderer.on('render-courses', (evt: any, ...arg: any[]) => {
    var courses = <Array<Course>>arg[0]
    const course_elm = <HTMLDivElement>document.querySelector("#course_data")
    var html = tmpl.render(courses);
    course_elm.innerHTML = html

    export_btn = <HTMLButtonElement>document.createElement("button")
    course_elm.appendChild(export_btn)
    export_btn.innerText = "Export to iCal file"
    export_btn.addEventListener('click', (evt: MouseEvent) => {
        evt.preventDefault()

        var new_date = new Date()
        new_date.setFullYear(parseInt(input_year.value))
        new_date.setMonth(parseInt(input_month.value) - 1);
        new_date.setDate(parseInt(input_day.value))

        ipcRenderer.send('export-courses', courses, new_date)
        export_btn.innerText = "Exporting..."
    })
})

ipcRenderer.on('export-finished', (evt: any, arg: any[]) => {
    export_btn.innerText = "Export finished"
})
