"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AlbumEntity = void 0;
var typeorm_1 = require("typeorm");
var artist_entity_1 = require("../../artist/entities/artist.entity");
var AlbumEntity = /** @class */ (function () {
    function AlbumEntity() {
    }
    __decorate([
        (0, typeorm_1.PrimaryGeneratedColumn)('uuid')
    ], AlbumEntity.prototype, "id");
    __decorate([
        (0, typeorm_1.Column)({ name: 'name', type: 'varchar' })
    ], AlbumEntity.prototype, "name");
    __decorate([
        (0, typeorm_1.Column)({ name: 'year', type: 'int' })
    ], AlbumEntity.prototype, "year");
    __decorate([
        (0, typeorm_1.Column)({ name: 'artistId', type: 'varchar', "default": null })
    ], AlbumEntity.prototype, "artistId");
    __decorate([
        (0, typeorm_1.ManyToOne)(function () { return artist_entity_1.ArtistEntity; }, function (artist) { return artist.id; }, {
            nullable: true,
            onDelete: 'SET NULL'
        }),
        (0, typeorm_1.JoinColumn)({ name: 'artistId', referencedColumnName: 'id' })
    ], AlbumEntity.prototype, "artist");
    AlbumEntity = __decorate([
        (0, typeorm_1.Entity)('album')
    ], AlbumEntity);
    return AlbumEntity;
}());
exports.AlbumEntity = AlbumEntity;
