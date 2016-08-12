"use strict";
var DEFAULT_VERSION = "2.0";
var DEFAULT_PRODID = "-//TypeScript/Node.js//SCAU Course Exporter v1.0//CN";
class VCalendar {
    constructor() {
        this.version = DEFAULT_VERSION;
        this.prodid = DEFAULT_PRODID;
        this.events = new Array();
    }
}
exports.VCalendar = VCalendar;
