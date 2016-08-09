"use strict";
const vevent_1 = require("./vevent");
const vcalendar_1 = require("./vcalendar");
const util_1 = require("./util");
var ENDL = "\n";
function genDate(_d) {
    return _d.toDateString();
}
function iCalGen(obj) {
    // var result = "";
    var result = new Array();
    if (obj instanceof vevent_1.VEvent) {
        var _evt = obj;
        result.push("BEGIN:VEVENT");
        result.push("UID:" + _evt.uid.content);
        result.push("DTSTAMP:" + genDate(_evt.dtstamp.content));
        result.push("ORGANIZER:" + _evt.organizer.content + ENDL);
        result.push("DTSTART:" + genDate(_evt.dtstart.content));
        result.push("DTEND:" + genDate(_evt.dtend.content));
        result.push("SUMMARY:" + _evt.summary.content);
        result.push("END:VEVENT" + ENDL);
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
function genFinal(init) {
    var result = "";
    for (var i = 0; i < init.length; ++i) {
        var finalLine = "";
        var line = init[i];
        var len = line.length;
        if (len > 60) {
            var remain_len = len;
            var index = 0;
            while (remain_len > 0) {
                for (var i = 0; i < index; ++i)
                    result += util_1.SPACE;
                result += line.slice(0, 60);
                line = line.slice(61);
                remain_len -= 60;
                index++;
            }
            line.slice(0, 60);
        }
        else
            finalLine = line;
        result += line + util_1.CRLF;
    }
    return result;
}
