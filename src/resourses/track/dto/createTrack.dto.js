"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.CreateTrackDto = void 0;
var class_validator_1 = require("class-validator");
var CreateTrackDto = /** @class */ (function () {
    function CreateTrackDto() {
    }
    __decorate([
        (0, class_validator_1.IsString)(),
        (0, class_validator_1.IsNotEmpty)()
    ], CreateTrackDto.prototype, "name");
    __decorate([
        (0, class_validator_1.IsString)(),
        (0, class_validator_1.IsNotEmpty)(),
        (0, class_validator_1.ValidateIf)(function (_, value) { return value !== null; })
    ], CreateTrackDto.prototype, "artistId");
    __decorate([
        (0, class_validator_1.IsString)(),
        (0, class_validator_1.IsNotEmpty)(),
        (0, class_validator_1.ValidateIf)(function (_, value) { return value !== null; })
    ], CreateTrackDto.prototype, "albumId");
    __decorate([
        (0, class_validator_1.IsInt)()
    ], CreateTrackDto.prototype, "duration");
    return CreateTrackDto;
}());
exports.CreateTrackDto = CreateTrackDto;
