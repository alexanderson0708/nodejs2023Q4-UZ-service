"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.UserEntity = void 0;
var class_transformer_1 = require("class-transformer");
var typeorm_1 = require("typeorm");
var UserEntity = /** @class */ (function () {
    function UserEntity() {
    }
    __decorate([
        (0, typeorm_1.PrimaryGeneratedColumn)('uuid')
    ], UserEntity.prototype, "id");
    __decorate([
        (0, typeorm_1.Column)({ name: 'name', type: 'varchar' })
    ], UserEntity.prototype, "login");
    __decorate([
        (0, typeorm_1.Column)({ name: 'password', type: 'varchar' }),
        (0, class_transformer_1.Exclude)()
    ], UserEntity.prototype, "password");
    __decorate([
        (0, typeorm_1.VersionColumn)({ name: 'version', type: 'int' })
    ], UserEntity.prototype, "version");
    __decorate([
        (0, typeorm_1.CreateDateColumn)({ name: 'create', type: 'timestamp' }),
        (0, class_transformer_1.Transform)(function (_a) {
            var value = _a.value;
            return new Date(value).getTime();
        })
    ], UserEntity.prototype, "createdAt");
    __decorate([
        (0, typeorm_1.UpdateDateColumn)({ name: 'update', type: 'timestamp' }),
        (0, class_transformer_1.Transform)(function (_a) {
            var value = _a.value;
            return new Date(value).getTime();
        })
    ], UserEntity.prototype, "updatedAt");
    UserEntity = __decorate([
        (0, typeorm_1.Entity)('user')
    ], UserEntity);
    return UserEntity;
}());
exports.UserEntity = UserEntity;
