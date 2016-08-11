import {RawCourseData, RawCourse, Course, 
    ISchoolYear, ISchoolWeek, 
    Teacher, Day} from "./course"
import {VCalendar} from "./vcalendar"
import {VEvent, IVEvent} from "./vevent"

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
    constructor(_init: T) {
        this.content = _init;
    }
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

export function createCalendar(courses: Array<Course>, startDate: Date, dtstamp?: Date): VCalendar {
    console.assert(startDate.getDay() === 1)
    if (!dtstamp) dtstamp = new Date();

    function eventFactory(course: Course): Array<VEvent> {
        let result = new Array<VEvent>();
        const course_begin_table = {
            1: {hour: 8, minite: 0},
            2: {hour: 8, minite: 50},
            3: {hour: 10, minite: 5},
            4: {hour: 10, minite: 55},
            5: {hour: 12, minite: 30},
            6: {hour: 13, minite: 20},
            7: {hour: 14, minite: 30},
            8: {hour: 15, minite: 20},
            9: {hour: 16, minite: 35},
            10: {hour: 17, minite: 25},
            11: {hour: 19, minite: 30},
            12: {hour: 20, minite: 20},
        };

        const course_end_table = {
            1: {hour: 8, minite: 40},
            2: {hour: 9, minite: 35},
            3: {hour: 10, minite: 45},
            4: {hour: 11, minite: 35},
            5: {hour: 13, minite: 10},
            6: {hour: 14, minite: 0},
            7: {hour: 15, minite: 10},
            8: {hour: 16, minite: 5},
            9: {hour: 17, minite: 15},
            10: {hour: 18, minite: 10},
            11: {hour: 20, minite: 10},
            13: {hour: 21, minite: 35},
        };

        for (var week = course.schoolWeeks["from"]; week <= course.schoolWeeks["to"]; ++week) {
            var _flag = course.schoolWeeks.flag;

            if ((_flag === 1 && week % 2 === 0) ||          // odd week course && week is even
            (_flag === 2 && week % 2 === 1)) continue;      // even week course && week is odd

            let _evt = new VEvent();

            let _start = new Date(startDate.toString());
            let _end = new Date(startDate.toString())

            _start.setDate(_start.getDate() + (week - 1) * 7 + (course.day - 1));
            _start.setHours(course_begin_table[course.courseNumbers[0]].hour);
            _start.setMinutes(course_begin_table[course.courseNumbers[0]].minute);
            _start.setSeconds(0);
            _start.setMilliseconds(0);

            _end.setDate(_end.getDate() + (week - 1) * 7 + (course.day - 1));
            _end.setHours(course_end_table[course.courseNumbers[course.courseNumbers.length - 1]].hour);
            _end.setMinutes(course_end_table[course.courseNumbers[course.courseNumbers.length - 1]].minute);
            _end.setSeconds(0);
            _end.setMilliseconds(0);

            if (dtstamp) _evt.dtstamp = new Value(dtstamp);
            _evt.summary = new Value(course.name + 
            " " + course.teacher.name +
            " " + course.location);
            _evt.location = new Value(course.location);
            _evt.dtstart = new Value(_start);
            _evt.dtend = new Value(_end);

            result.push(_evt);
        }
        return result;
    }

    var result = new VCalendar();
    for (var i=0; i < courses.length; ++i) {
        result.events = result.events.concat(eventFactory(courses[i]))
    }
    return result;
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

    function parseCourseNumber(timeinfo: string): Array<number> {
        let _bracket_index = timeinfo.indexOf("{");
        let _slice = timeinfo.slice(0, _bracket_index);

        let _number_test= /[0-9]+/g;
        let _dat = _slice.match(_number_test);

        let result = new Array<number>();
        
        _dat.forEach((value: string) => {
            result.push(parseInt(value));
        })

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
        course.courseNumbers = parseCourseNumber(raw_co[i].timeinfo);
        course.day = parseDay(raw_co[i].timeinfo);
        result.push(course);
    }
    return result;
}
