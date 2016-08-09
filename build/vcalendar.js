"use strict";
var DEFAULT_VERSION = "2.0";
var DEFAULT_PRODID = "-//hacksw/handcal//NONSGML v1.0//EN";
class VCalendar {
    constructor() {
        this.version = DEFAULT_VERSION;
        this.prodid = DEFAULT_PRODID;
        this.events = new Array();
    }
}
exports.VCalendar = VCalendar;
