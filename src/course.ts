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

interface ISchoolYear {
    from: number;
    to: number;
};

interface ISchoolWeek {
    from: number;
    to: number;
}

interface ICourseNumber {
    from: number;
    to: number;
}

enum Term {
    UP, DOWN
}

enum Day {
    Monday = 1, TuesDay, Wednesday,
    ThursDay, Friday, Saturday, Sunday
};

class Teacher {
    name: string
};

class Course {
    uid: string;
    name: string;
    schoolYear: ISchoolYear;
    term: Term;
    teacher: Teacher;
    schoolWeeks: ISchoolWeek;
    courseNumber: ICourseNumber;
    day: Day;
};
