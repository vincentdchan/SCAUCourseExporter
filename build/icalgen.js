"use strict";
const vevent_1 = require("./vevent");
const vcalendar_1 = require("./vcalendar");
const util_1 = require("./util");
const fs = require("fs");
var ENDL = "\n";
function genDate(_d) {
    function getFixedLen(s, len) {
        if (s.length < len) {
            return getFixedLen("0" + s, len);
        }
        else if (s.length > len) {
            return s.slice(0, len);
        }
        else
            return s;
    }
    var result = "";
    result += getFixedLen(_d.getUTCFullYear().toString(), 4);
    result += getFixedLen((_d.getUTCMonth() + 1).toString(), 2);
    result += getFixedLen(_d.getUTCDate().toString(), 2);
    result += "T";
    result += getFixedLen(_d.getUTCHours().toString(), 2);
    result += getFixedLen(_d.getUTCMinutes().toString(), 2);
    result += getFixedLen(_d.getUTCSeconds().toString(), 2);
    result += "Z";
    return result;
}
function iCalGen(obj) {
    // var result = "";
    var result = new Array();
    if (obj instanceof vevent_1.VEvent) {
        var _evt = obj;
        result.push("BEGIN:VEVENT");
        result.push("UID:" + _evt.uid.content);
        result.push("DTSTAMP:" + genDate(_evt.dtstamp.content));
        if (_evt.organizer)
            result.push("ORGANIZER:" + _evt.organizer.content);
        result.push("DTSTART:" + genDate(_evt.dtstart.content));
        result.push("DTEND:" + genDate(_evt.dtend.content));
        result.push("SUMMARY:" + _evt.summary.content);
        result.push("END:VEVENT");
    }
    else if (obj instanceof vcalendar_1.VCalendar) {
        var _cal = obj;
        result.push("BEGIN:VCALENDAR");
        result.push("VERSION:" + _cal.version);
        result.push("PRODID:" + _cal.prodid);
        for (var i = 0; i < _cal.events.length; ++i)
            result = result.concat(iCalGen(_cal.events[i]));
        result.push("END:VCALENDAR");
    }
    return result;
}
;
function* genFinal(init) {
    for (var i = 0; i < init.length; ++i) {
        var finalLine = "";
        var line = init[i];
        var len = line.length;
        if (len > 60) {
            var remain_len = len;
            var index = 0;
            while (remain_len > 0) {
                for (var i = 0; i < index; ++i)
                    yield util_1.SPACE;
                yield line.slice(0, 60);
                line = line.slice(61);
                remain_len -= 60;
                index++;
            }
            line.slice(0, 60);
        }
        else
            finalLine = line;
        yield line + util_1.CRLF;
    }
}
exports.genFinal = genFinal;
function calendarGen(cal) {
    return genFinal(iCalGen(cal));
}
exports.calendarGen = calendarGen;
