import {Value} from "./util"

export interface IVEvent {
    dtstamp:        Value<Date>;
    uid:            Value<string>;
    dtstart?:       Value<Date>; // it's required if it's int iCalendar without METHOD
    dtend?:         Value<Date>;
    duration?:      Value<string>;
    _class?:        Value<string>;
    created?:       Value<Date>;
    description?:   Value<string>;
    geo?:           Value<string>;
    last_mod?:      Value<string>; // last-mod
    location?:      Value<string>;
    organizer?:     Value<string>;
    priority?:      Value<string>;
    seq?:           Value<string>;
    status?:        Value<string>;
    summary?:       Value<string>;
    stransp?:       Value<string>;
    url?:           Value<string>;
    recurid?:       Value<string>;
    rrule?:         Value<string>;
    attach?:        Value<Array<string>>;
    attendee?:      Value<Array<string>>;
    categories?:    Value<Array<string>>;
    comment?:       Value<Array<string>>;
    contact?:       Value<Array<string>>;
    exdate?:        Value<Array<string>>;
    rstatus?:       Value<Array<string>>;
    related?:       Value<Array<string>>;
    resources?:     Value<Array<string>>;
    rdate?:         Value<Array<string>>;
    x_prop?:        Value<Array<string>>;
    iana_prop?:     Value<Array<string>>;
}

export class VEvent implements IVEvent {
    public uid:         Value<string>;
    public dtstamp:     Value<Date>;
    public organizer:   Value<string>;
    public dtstart:     Value<Date>;
    public dtend:       Value<Date>;
    public location:    Value<string>;
    public summary:     Value<string>;
    public categories:  Value<Array<string>>;
    public _class:      Value<string>;

    public constructor(evt?: IVEvent) {
        if (evt)
        {
           this.uid = evt.uid; 
           this.dtstamp = evt.dtstamp;
           this.organizer = evt.organizer;
           this.dtstart = evt.dtstart;
           this.dtend = evt.dtend;
           this.summary = evt.summary;
           this.categories = evt.categories;
           this._class = evt._class;
        }
    }

}
