var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Students = /** @class */ (function () {
    function Students(name, age, nationality) {
        this.name = name;
        this.age = age;
        this.gender = 'female'; //as requested 
        this.nationality = nationality;
    }
    Students.prototype.getNationality = function () {
        return this.nationality;
    };
    Students.prototype.getGender = function () {
        return this.gender;
    };
    return Students;
}());
var Undergraduates = /** @class */ (function (_super) {
    __extends(Undergraduates, _super);
    function Undergraduates(name, age, nationality, GPA) {
        var _this = _super.call(this, name, age, nationality) || this;
        _this.GPA = GPA;
        return _this;
    }
    return Undergraduates;
}(Students));
var newUndergrate = new Undergraduates('Stephen', 23, 'Canada', 4.0);
console.log("nationality: " + newUndergrate.getNationality());
console.log("gender: " + newUndergrate.getGender());
