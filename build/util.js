"use strict";
const course_1 = require("./course");
var BASE_CHAR;
(function (BASE_CHAR) {
    BASE_CHAR[BASE_CHAR["HTAB"] = 9] = "HTAB";
    BASE_CHAR[BASE_CHAR["LF"] = 10] = "LF";
    BASE_CHAR[BASE_CHAR["CR"] = 13] = "CR";
    BASE_CHAR[BASE_CHAR["DQUOTE"] = 22] = "DQUOTE";
    BASE_CHAR[BASE_CHAR["SPACE"] = 32] = "SPACE";
    BASE_CHAR[BASE_CHAR["PLUS_SIGN"] = 43] = "PLUS_SIGN";
    BASE_CHAR[BASE_CHAR["COMMA"] = 44] = "COMMA";
    BASE_CHAR[BASE_CHAR["HYPHEN_MINUS"] = 45] = "HYPHEN_MINUS";
    BASE_CHAR[BASE_CHAR["PERIOD"] = 46] = "PERIOD";
    BASE_CHAR[BASE_CHAR["SOLIDUS"] = 47] = "SOLIDUS";
    BASE_CHAR[BASE_CHAR["COLON"] = 58] = "COLON";
    BASE_CHAR[BASE_CHAR["SEMICOLON"] = 59] = "SEMICOLON";
    BASE_CHAR[BASE_CHAR["LETTER_N"] = 78] = "LETTER_N";
    BASE_CHAR[BASE_CHAR["LETTER_T"] = 84] = "LETTER_T";
    BASE_CHAR[BASE_CHAR["LETTER_X"] = 88] = "LETTER_X";
    BASE_CHAR[BASE_CHAR["LETTER_Z"] = 90] = "LETTER_Z";
    BASE_CHAR[BASE_CHAR["BACKSLASH"] = 92] = "BACKSLASH";
    BASE_CHAR[BASE_CHAR["SMALL_LETTER"] = 110] = "SMALL_LETTER";
})(BASE_CHAR || (BASE_CHAR = {}));
;
exports.CRLF = String.fromCharCode(BASE_CHAR.CR) + String.fromCharCode(BASE_CHAR.LF);
exports.SPACE = String.fromCharCode(BASE_CHAR.SPACE);
class Value {
}
exports.Value = Value;
function isDigit(_dat) {
    let _zero = "0".charCodeAt(0);
    let _ni = "9".charCodeAt(0);
    let _code = _dat.charCodeAt(0);
    if (_code >= _zero && _code <= _ni)
        return true;
    else
        return false;
}
function cookCourse(raw) {
    function parseSchoolYear(_str) {
        let number_test = /[0-9]+/g;
        let _data = _str.match(number_test);
        if (_data.length < 2)
            return null;
        else
            return {
                from: parseInt(_data[0]),
                to: parseInt(_data[1])
            };
    }
    function parseSchoolWeek(_timeinfo) {
        let school_week_tester = /{[^}]+}/;
        let _fuck = _timeinfo.match(school_week_tester);
        if (_fuck === null || _fuck.length < 1)
            return null;
        let info = _fuck[0].slice(1, _fuck[0].length - 1); // get the info in the brackets
        let _data = {
            from: 0,
            to: 0,
            flag: 0
        };
        let _single = info.match("单周");
        let _double = info.match("双周");
        if (_single && _single.length > 0)
            _data.flag = 1;
        else if (_double && _double.length > 0)
            _data.flag = 2;
        else
            _data.flag = 0;
        let _number_test = /[0-9]+/g;
        let _dat = info.match(_number_test);
        if (_dat && _dat.length >= 2) {
            _data["from"] = parseInt(_dat[0]);
            _data["to"] = parseInt(_dat[1]);
        }
        return _data;
    }
    function parseCourseNumber(timeinfo) {
        let _bracket_index = timeinfo.indexOf("{");
        let _slice = timeinfo.slice(0, _bracket_index);
        let _number_test = /[0-9]+/g;
        let _dat = _slice.match(_number_test);
        let result = {
            from: 0,
            to: 0
        };
        if (_dat.length >= 2) {
            result["from"] = parseInt(_dat[0]);
            result["to"] = parseInt(_dat[1]);
        }
        return result;
    }
    function parseDay(_timeinfo) {
        // _timeinfo[0] should be "周"
        var word = _timeinfo[1];
        switch (word) {
            case "一":
                return course_1.Day.Monday;
            case "二":
                return course_1.Day.TuesDay;
            case "三":
                return course_1.Day.Wednesday;
            case "四":
                return course_1.Day.ThursDay;
            case "五":
                return course_1.Day.Friday;
            case "六":
                return course_1.Day.Saturday;
            case "日":
                return course_1.Day.Sunday;
            default:
                return null;
        }
    }
    let raw_co = raw.courses;
    let result = new Array();
    let _term = parseInt(raw.term);
    for (var i = 0; i < raw_co.length; ++i) {
        var course = new course_1.Course();
        course.uid = i;
        course.name = raw_co[i].name;
        course.term = parseInt(raw.term);
        course.schoolYear = parseSchoolYear(raw.schoolYear);
        course.schoolWeeks = parseSchoolWeek(raw_co[i].timeinfo);
        course.location = raw_co[i].location;
        course.teacher = new course_1.Teacher(raw_co[i].teacher_name);
        course.courseNumber = parseCourseNumber(raw_co[i].timeinfo);
        course.day = parseDay(raw_co[i].timeinfo);
        result.push(course);
    }
    return result;
}
exports.cookCourse = cookCourse;
