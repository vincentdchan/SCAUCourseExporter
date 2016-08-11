import {VEvent, IVEvent} from "./vevent"
import {VCalendar} from "./vcalendar"
import {CRLF, SPACE} from "./util"

var ENDL = "\n";

function genDate(_d: Date): string {
    return _d.toDateString(); 
}

function iCalGen(obj: any): Array<string> {
    // var result = "";
    var result = new Array<string>();
    if (obj instanceof VEvent) {
        var _evt = <IVEvent>obj;
        result.push("BEGIN:VEVENT");
        result.push("UID:" + _evt.uid.content);
        result.push("DTSTAMP:" + genDate(_evt.dtstamp.content));
        result.push("ORGANIZER:" + _evt.organizer.content + ENDL)
        result.push("DTSTART:" + genDate(_evt.dtstart.content));
        result.push("DTEND:" + genDate(_evt.dtend.content));
        result.push("SUMMARY:" + _evt.summary.content);
        result.push("END:VEVENT" + ENDL);
    } else if (obj instanceof VCalendar) {
        var _cal = <VCalendar>obj;
        result.push("BEGIN:VCALENDAR");
        result.push("VERSION:" + _cal.version);
        result.push("PRODID:" + _cal.prodid);
        for (var i = 0; i < _cal.events.length; ++i)
            result = result.concat(iCalGen(_cal.events[i]));
        result.push("END:VCALENDAR");
    } 
    return result;
};

function genFinal(init: Array<string>): string {
    var result = "";
    for (var i=0; i < init.length; ++i)
    {
        var finalLine = "";
        var line = init[i];
        var len = line.length;
        if (len > 60) // dangerous
        {
            var remain_len = len;
            var index = 0;
            while (remain_len > 0)
            {
                for (var i = 0; i < index; ++i)
                    result += SPACE;
                result += line.slice(0, 60);
                line = line.slice(61);
                remain_len -= 60;
                index++;
            }
            line.slice(0, 60);
        }
        else
            finalLine = line;
        result += line + CRLF;
    }
    return result;
}

export function calendarGen(cal: VCalendar): string {
    return genFinal(iCalGen(cal))
}
