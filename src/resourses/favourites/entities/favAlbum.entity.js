"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.FavAlbumEntity = void 0;
var typeorm_1 = require("typeorm");
var album_entity_1 = require("../../album/entities/album.entity");
var FavAlbumEntity = /** @class */ (function () {
    function FavAlbumEntity() {
    }
    __decorate([
        (0, typeorm_1.PrimaryGeneratedColumn)()
    ], FavAlbumEntity.prototype, "id");
    __decorate([
        (0, typeorm_1.Column)({ name: 'albumId', type: 'uuid' })
    ], FavAlbumEntity.prototype, "albumId");
    __decorate([
        (0, typeorm_1.ManyToOne)(function () { return album_entity_1.AlbumEntity; }, { onDelete: 'CASCADE' }),
        (0, typeorm_1.JoinColumn)({ name: 'albumId', referencedColumnName: 'id' })
    ], FavAlbumEntity.prototype, "album");
    FavAlbumEntity = __decorate([
        (0, typeorm_1.Entity)('fav_album')
    ], FavAlbumEntity);
    return FavAlbumEntity;
}());
exports.FavAlbumEntity = FavAlbumEntity;
