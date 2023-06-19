"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.TrackEntity = void 0;
var typeorm_1 = require("typeorm");
var artist_entity_1 = require("../../artist/entities/artist.entity");
var album_entity_1 = require("../../album/entities/album.entity");
var TrackEntity = /** @class */ (function () {
    function TrackEntity() {
    }
    __decorate([
        (0, typeorm_1.PrimaryGeneratedColumn)('uuid')
    ], TrackEntity.prototype, "id");
    __decorate([
        (0, typeorm_1.Column)({ name: 'name', type: 'varchar' })
    ], TrackEntity.prototype, "name");
    __decorate([
        (0, typeorm_1.Column)({ name: 'artistId', type: 'uuid', "default": null })
    ], TrackEntity.prototype, "artistId");
    __decorate([
        (0, typeorm_1.Column)({ name: 'albumId', type: 'uuid', "default": null })
    ], TrackEntity.prototype, "albumId");
    __decorate([
        (0, typeorm_1.Column)({ name: 'duration', type: 'int' })
    ], TrackEntity.prototype, "duration");
    __decorate([
        (0, typeorm_1.ManyToOne)(function () { return artist_entity_1.ArtistEntity; }, function (artist) { return artist.id; }, {
            nullable: true,
            onDelete: 'SET NULL'
        }),
        (0, typeorm_1.JoinColumn)({ name: 'artistId', referencedColumnName: 'id' })
    ], TrackEntity.prototype, "artist");
    __decorate([
        (0, typeorm_1.ManyToOne)(function () { return album_entity_1.AlbumEntity; }, function (album) { return album.id; }, {
            nullable: true,
            onDelete: 'SET NULL'
        }),
        (0, typeorm_1.JoinColumn)({ name: 'albumId', referencedColumnName: 'id' })
    ], TrackEntity.prototype, "album");
    TrackEntity = __decorate([
        (0, typeorm_1.Entity)('track')
    ], TrackEntity);
    return TrackEntity;
}());
exports.TrackEntity = TrackEntity;
