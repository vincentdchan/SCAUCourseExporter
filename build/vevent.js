"use strict";
class VEvent {
    constructor(evt) {
        if (evt) {
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
exports.VEvent = VEvent;
