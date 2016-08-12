import {ipcRenderer} from 'electron'
import {Course} from '../course'
const jsrender = require('jsrender')
const link_input = <HTMLInputElement>document.querySelector("#link_input")
const open_wn_btn = <HTMLButtonElement>document.querySelector('#open_wn_btn')
const raw_courses_tmpl_elm = <HTMLScriptElement>document.querySelector("#RawCourseTemplate")
const date_input_tmpl_elm = <HTMLScriptElement>document.querySelector("#DateInputTemplate")
// const input_date = <HTMLInputElement>document.querySelector("#input-date")
const tmpl = jsrender.templates(raw_courses_tmpl_elm.innerHTML)
const date_input_tmpl = jsrender.templates(date_input_tmpl_elm.innerHTML)

link_input.value = "http://202.116.160.170/"

function init() {
    var current = new Date();
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
    const datepicker_container = <HTMLDivElement>document.createElement("div")

    var datepicker_html = date_input_tmpl.render()
    var html = tmpl.render(courses);
    course_elm.innerHTML = html
    datepicker_container.innerHTML = datepicker_html

    export_btn = <HTMLButtonElement>document.createElement("button")
    course_elm.appendChild(datepicker_container)
    course_elm.appendChild(export_btn)
    export_btn.innerText = "Export to iCal file"
    export_btn.addEventListener('click', (evt: MouseEvent) => {
        evt.preventDefault()
        const input_date = <HTMLInputElement>document.querySelector("#input-date")

        var new_date = new Date(input_date.value)

        if (new_date.getDay() === 1) {
            ipcRenderer.send('export-courses', courses, new_date)
            export_btn.innerText = "Exporting..."
        } else {
            alert("Error! The day should be Monday")
        }

    })
})

ipcRenderer.on('export-finished', (evt: any, arg: any[]) => {
    export_btn.innerText = "Export finished"
})
