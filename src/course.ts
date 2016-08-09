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
