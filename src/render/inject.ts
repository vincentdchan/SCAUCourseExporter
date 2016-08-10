import {ipcRenderer} from "electron"
const url = window.location.href


const PAGE = {
    "main" : /xs_main.aspx/,
    "course_table": /xskbcx.aspx/
}

function findAnchorWithText(txt: string) : HTMLAnchorElement {
    var elms = document.querySelectorAll('a')
    for (var i = 0; i < elms.length; ++i)
    {
        if (elms[i].textContent === txt)
            return <HTMLAnchorElement>elms[i];
    }
}

interface RawCourse {
    name: string;
    quantity: number;
    timeinfo: string;
    teacher_name: string;
    location?: string;
    examinfo? :string;
}

interface RawCourseData {
    schoolYear: string;
    term: string;
    courses: Array<RawCourse>;
}

function exportCourse() : Array<RawCourse> {
    function tryParse(td: HTMLTableCellElement) : RawCourse {
        var str = td.innerHTML;
        const rowspan = td.rowSpan;

        if (str && str.length > 0) {
            str = str.replace(/<br>/g, "\n")
            var _data = str.match(/[^\n]+/g)
            if (_data.length >= 3) {
                var data: RawCourse = {
                    name: _data[0],
                    timeinfo: _data[1],
                    teacher_name: _data[2],
                    quantity: 1
                }
                if (_data.length >= 4)
                    data.location = _data[3]
                if (_data.length >= 5)
                    data.examinfo = _data[4]
                if (rowspan)
                    data.quantity = <number>rowspan;
                return data;
            }
        }
        return null
    }
    var result = new Array<RawCourse>()
    const table = <HTMLTableElement>document.querySelector('#Table1')
    const tds = <NodeListOf<HTMLTableDataCellElement>>table.querySelectorAll('td')
    for (var i = 0; i < tds.length; ++i) {
        var _td = tds[i]
        var re = tryParse(_td)
        if (re)
            result.push(re)
    }
    return result;
}

function main()
{
    if (PAGE["main"].test(url))
    {
        let btn = findAnchorWithText('学生个人课表');
        let link = btn.href;
        window.location.href = link;

    } else if (PAGE["course_table"].test(url)) {
        const schoolyear_select = <HTMLSelectElement>document.querySelector('#xnd')
        const term_select = <HTMLSelectElement>document.querySelector('#xqd')
        const inject_td = <HTMLTableDataCellElement>document
            .querySelector('#Table2 > tbody > tr:nth-child(1) > td:nth-child(1)')
        const export_btn = document.createElement('button')
        inject_td.appendChild(export_btn)

        export_btn.innerText = "导出课表"
        export_btn.addEventListener('click', (evt: MouseEvent) => {
            evt.preventDefault()
            let courses = exportCourse()
            let data = {
                courses: courses,
                schoolYear: schoolyear_select.value,
                term: term_select.value
            }
            ipcRenderer.send('zf-raw-course-data', data);
        })
    }
}

main()