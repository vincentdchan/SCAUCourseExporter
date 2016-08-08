
enum BASE_CHAR {
    HTAB = 9,
    LF = 10,
    CR = 13,
    DQUOTE = 22,
    SPACE = 32,
    PLUS_SIGN = 43,
    COMMA = 44,
    HYPHEN_MINUS = 45,
    PERIOD = 46,
    SOLIDUS = 47,
    COLON = 58,
    SEMICOLON = 59,
    LETTER_N = 78,
    LETTER_T = 84,
    LETTER_X = 88,
    LETTER_Z = 90,
    BACKSLASH = 92,
    SMALL_LETTER = 110,
};

export var CRLF = String.fromCharCode(BASE_CHAR.CR) + String.fromCharCode(BASE_CHAR.LF);
export var SPACE = String.fromCharCode(BASE_CHAR.SPACE);

export interface IProperty {
    name: string;
    value: string;
}

export class Value<T> {
    public properties: Array<IProperty>;
    public content: T;
}
