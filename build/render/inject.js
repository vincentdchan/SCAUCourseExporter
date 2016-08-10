"use strict";
const electron_1 = require("electron");
const url = window.location.href;
const PAGE = {
    "main": /xs_main.aspx/,
    "course_table": /xskbcx.aspx/
};
function findAnchorWithText(txt) {
    var elms = document.querySelectorAll('a');
    for (var i = 0; i < elms.length; ++i) {
        if (elms[i].textContent === txt)
            return elms[i];
    }
}
function exportCourse() {
    function tryParse(td) {
        var str = td.innerHTML;
        const rowspan = td.rowSpan;
        if (str && str.length > 0) {
            str = str.replace(/<br>/g, "\n");
            var _data = str.match(/[^\n]+/g);
            if (_data.length >= 3) {
                var data = {
                    name: _data[0],
                    timeinfo: _data[1],
                    teacher_name: _data[2],
                    quantity: 1
                };
                if (_data.length >= 4)
                    data.location = _data[3];
                if (_data.length >= 5)
                    data.examinfo = _data[4];
                if (rowspan)
                    data.quantity = rowspan;
                return data;
            }
        }
        return null;
    }
    var result = new Array();
    const table = document.querySelector('#Table1');
    const tds = table.querySelectorAll('td');
    for (var i = 0; i < tds.length; ++i) {
        var _td = tds[i];
        var re = tryParse(_td);
        if (re)
            result.push(re);
    }
    return result;
}
function main() {
    if (PAGE["main"].test(url)) {
        let btn = findAnchorWithText('学生个人课表');
        let link = btn.href;
        window.location.href = link;
    }
    else if (PAGE["course_table"].test(url)) {
        const schoolyear_select = document.querySelector('#xnd');
        const term_select = document.querySelector('#xqd');
        const inject_td = document
            .querySelector('#Table2 > tbody > tr:nth-child(1) > td:nth-child(1)');
        const export_btn = document.createElement('button');
        inject_td.appendChild(export_btn);
        export_btn.innerText = "导出课表";
        export_btn.addEventListener('click', (evt) => {
            evt.preventDefault();
            let courses = exportCourse();
            let data = {
                courses: courses,
                schoolYear: schoolyear_select.value,
                term: term_select.value
            };
            electron_1.ipcRenderer.send('zf-raw-course-data', data);
        });
    }
}
main();
