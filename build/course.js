"use strict";
;
(function (Day) {
    Day[Day["Monday"] = 1] = "Monday";
    Day[Day["TuesDay"] = 2] = "TuesDay";
    Day[Day["Wednesday"] = 3] = "Wednesday";
    Day[Day["ThursDay"] = 4] = "ThursDay";
    Day[Day["Friday"] = 5] = "Friday";
    Day[Day["Saturday"] = 6] = "Saturday";
    Day[Day["Sunday"] = 7] = "Sunday";
})(exports.Day || (exports.Day = {}));
var Day = exports.Day;
;
class Teacher {
    constructor(_name) {
        this.name = _name;
    }
}
exports.Teacher = Teacher;
;
class Course {
}
exports.Course = Course;
;
