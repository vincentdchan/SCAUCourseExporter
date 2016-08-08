var BASE_CHAR;
(function (BASE_CHAR) {
    BASE_CHAR[BASE_CHAR["HTAB"] = 9] = "HTAB";
    BASE_CHAR[BASE_CHAR["LF"] = 10] = "LF";
    BASE_CHAR[BASE_CHAR["CR"] = 13] = "CR";
    BASE_CHAR[BASE_CHAR["DQUOTE"] = 22] = "DQUOTE";
    BASE_CHAR[BASE_CHAR["SPACE"] = 32] = "SPACE";
    BASE_CHAR[BASE_CHAR["PLUS_SIGN"] = 43] = "PLUS_SIGN";
    BASE_CHAR[BASE_CHAR["COMMA"] = 44] = "COMMA";
    BASE_CHAR[BASE_CHAR["HYPHEN_MINUS"] = 45] = "HYPHEN_MINUS";
    BASE_CHAR[BASE_CHAR["PERIOD"] = 46] = "PERIOD";
    BASE_CHAR[BASE_CHAR["SOLIDUS"] = 47] = "SOLIDUS";
    BASE_CHAR[BASE_CHAR["COLON"] = 58] = "COLON";
    BASE_CHAR[BASE_CHAR["SEMICOLON"] = 59] = "SEMICOLON";
    BASE_CHAR[BASE_CHAR["LETTER_N"] = 78] = "LETTER_N";
    BASE_CHAR[BASE_CHAR["LETTER_T"] = 84] = "LETTER_T";
    BASE_CHAR[BASE_CHAR["LETTER_X"] = 88] = "LETTER_X";
    BASE_CHAR[BASE_CHAR["LETTER_Z"] = 90] = "LETTER_Z";
    BASE_CHAR[BASE_CHAR["BACKSLASH"] = 92] = "BACKSLASH";
    BASE_CHAR[BASE_CHAR["SMALL_LETTER"] = 110] = "SMALL_LETTER";
})(BASE_CHAR || (BASE_CHAR = {}));
;
exports.CRLF = String.fromCharCode(BASE_CHAR.CR) + String.fromCharCode(BASE_CHAR.LF);
exports.SPACE = String.fromCharCode(BASE_CHAR.SPACE);
var Value = (function () {
    function Value() {
    }
    return Value;
})();
exports.Value = Value;
//# sourceMappingURL=util.js.map