import {Value} from "./util"

export interface IEvent {
    dtstamp: string;
    uid: string;
    dtstart?: string; // it's required if it's int iCalendar without METHOD
    dtend?: string;
    duration?: string;
    class?: string;
    created?: string;
    description?: string;
    geo?: string;
    last_mod?: string; // last-mod
    location?: string;
    organizer?: string;
    priority?: string;
    seq?: string;
    status?: string;
    summary?: string;
    stransp?: string;
    url?: string;
    recurid?: string;
    rrule?: string;
    attach?: Array<string>;
    attendee?: Array<string>;
    categories?: Array<string>;
    comment?: Array<string>;
    contact?: Array<string>;
    exdate?: Array<string>;
    rstatus?: Array<string>;
    related?: Array<string>;
    resources?: Array<string>;
    rdate?: Array<string>;
    x_prop?: Array<string>;
    iana_prop?: Array<string>;
}

export class VEvent {
    public uid:        Value<string>;
    public dateStamp:  Value<Date>;
    public organizer:  Value<string>;
    public dateStart:  Value<Date>;
    public dateEnd:    Value<Date>;
    public summary:    Value<string>;
    public categories: Value<Array<string>>;
    public _class:     Value<string>;

    public constructor() {
    }

}
