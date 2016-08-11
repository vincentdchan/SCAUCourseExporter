export interface RawCourse {
    name: string;
    quantity: number;
    timeinfo: string;
    teacher_name: string;
    location?: string;
    examinfo? :string;
}

export interface RawCourseData {
    schoolYear: string;
    term: string;
    courses: Array<RawCourse>;
}

export interface ISchoolYear {
    from: number;
    to: number;
};

export interface ISchoolWeek {
    from: number;
    to: number;
    flag: number; // 0 for all weeks, 1 for single weeks, 2 for double weeks
}

export enum Day {
    Monday = 1, TuesDay, Wednesday,
    ThursDay, Friday, Saturday, Sunday
};

export class Teacher {
    name: string

    constructor ( _name: string) {
        this.name = _name;
    }
};

export class Course {
    uid: number;
    name: string;
    schoolYear: ISchoolYear;
    term: number;
    teacher: Teacher;
    schoolWeeks: ISchoolWeek;
    courseNumbers: Array<number>;
    location: string;
    day: Day;
};
