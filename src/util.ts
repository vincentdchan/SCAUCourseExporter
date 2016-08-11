import {RawCourseData, RawCourse, Course, 
    ISchoolYear, ISchoolWeek, ICourseNumber, 
    Teacher, Day} from "./course"

enum BASE_CHAR {
    HTAB = 9,
    LF = 10,
    CR = 13,
    DQUOTE = 22,
    SPACE = 32,
    PLUS_SIGN = 43,
    COMMA = 44,
    HYPHEN_MINUS = 45,
    PERIOD = 46,
    SOLIDUS = 47,
    COLON = 58,
    SEMICOLON = 59,
    LETTER_N = 78,
    LETTER_T = 84,
    LETTER_X = 88,
    LETTER_Z = 90,
    BACKSLASH = 92,
    SMALL_LETTER = 110,
};

export var CRLF = String.fromCharCode(BASE_CHAR.CR) + String.fromCharCode(BASE_CHAR.LF);
export var SPACE = String.fromCharCode(BASE_CHAR.SPACE);

export interface IProperty {
    name: string;
    value: string;
}

export class Value<T> {
    public properties: Array<IProperty>;
    public content: T;
}

function isDigit(_dat: string): boolean {
    let _zero = "0".charCodeAt(0);
    let _ni = "9".charCodeAt(0);
    let _code = _dat.charCodeAt(0);
    if (_code >= _zero && _code <= _ni)
        return true;
    else
        return false;
}

export function cookCourse(raw: RawCourseData): Array<Course> {

    function parseSchoolYear(_str: string) : ISchoolYear {
        let number_test = /[0-9]+/g;
        let _data = _str.match(number_test);

        if (_data.length < 2)
            return null;
        else
            return {
                from: parseInt(_data[0]),
                to: parseInt(_data[1])
            }
    }

    function parseSchoolWeek(_timeinfo: string) : ISchoolWeek {
        let school_week_tester = /{[^}]+}/;
        let _fuck = _timeinfo.match(school_week_tester);
        if (_fuck === null || _fuck.length < 1) return null;
        let info = _fuck[0].slice(1, _fuck[0].length-1); // get the info in the brackets
        let _data = {
            from: 0,
            to: 0,
            flag: 0
        }

        let _single = info.match("单周");
        let _double = info.match("双周");

        if (_single && _single.length > 0)
            _data.flag = 1;
        else if (_double && _double.length > 0)
            _data.flag = 2;
        else
            _data.flag = 0;

        let _number_test= /[0-9]+/g;
        let _dat = info.match(_number_test);
        if (_dat && _dat.length >= 2) {
            _data["from"] = parseInt(_dat[0]);
            _data["to"] = parseInt(_dat[1]);
        }
        
        return _data;
    }

    function parseCourseNumber(timeinfo: string) : ICourseNumber {
        let _bracket_index = timeinfo.indexOf("{");
        let _slice = timeinfo.slice(0, _bracket_index);

        let _number_test= /[0-9]+/g;
        let _dat = _slice.match(_number_test);

        let result = {
            from: 0,
            to: 0
        }

        if (_dat.length >= 2) {
            result["from"] = parseInt(_dat[0]);
            result["to"] = parseInt(_dat[1]);
        }

        return result;
    }

    function parseDay(_timeinfo: string) : Day {
        // _timeinfo[0] should be "周"
        var word = _timeinfo[1];
        switch(word) {
            case "一":
                return Day.Monday;
            case "二":
                return Day.TuesDay;
            case "三":
                return Day.Wednesday;
            case "四":
                return Day.ThursDay;
            case "五":
                return Day.Friday;
            case "六":
                return Day.Saturday;
            case "日":
                return Day.Sunday;
            default:
                return null;
        }
    }

    let raw_co = raw.courses;
    let result = new Array<Course>();
    let _term = parseInt(raw.term);

    for (var i=0; i < raw_co.length; ++i) {
        var course = new Course();
        course.uid = i;
        course.name = raw_co[i].name;
        course.term = parseInt(raw.term);
        course.schoolYear = parseSchoolYear(raw.schoolYear);
        course.schoolWeeks = parseSchoolWeek(raw_co[i].timeinfo);
        course.location = raw_co[i].location;
        course.teacher = new Teacher(raw_co[i].teacher_name);
        course.courseNumber = parseCourseNumber(raw_co[i].timeinfo);
        course.day = parseDay(raw_co[i].timeinfo);
        result.push(course);
    }
    return result;
}
