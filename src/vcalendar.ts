import {IVEvent, VEvent} from "./vevent"

var DEFAULT_VERSION = "2.0";
var DEFAULT_PRODID = "-//hacksw/handcal//NONSGML v1.0//EN"

export interface IVCalendar {
    events: Array<IVEvent>;
    version: string;
    prodid: string;
}

export class VCalendar {
    events: Array<IVEvent>;
    version: string;
    prodid: string;

    constructor() {
        this.version = DEFAULT_VERSION;
        this.prodid = DEFAULT_PRODID;
        this.events = new Array<VEvent>();
    }

}