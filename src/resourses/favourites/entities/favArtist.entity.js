"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.FavArtistEntity = void 0;
var typeorm_1 = require("typeorm");
var artist_entity_1 = require("../../artist/entities/artist.entity");
var FavArtistEntity = /** @class */ (function () {
    function FavArtistEntity() {
    }
    __decorate([
        (0, typeorm_1.PrimaryGeneratedColumn)()
    ], FavArtistEntity.prototype, "id");
    __decorate([
        (0, typeorm_1.Column)({ name: 'artistId', type: 'uuid' })
    ], FavArtistEntity.prototype, "artistId");
    __decorate([
        (0, typeorm_1.ManyToOne)(function () { return artist_entity_1.ArtistEntity; }, { onDelete: 'CASCADE' }),
        (0, typeorm_1.JoinColumn)({ name: 'artistId', referencedColumnName: 'id' })
    ], FavArtistEntity.prototype, "artist");
    FavArtistEntity = __decorate([
        (0, typeorm_1.Entity)('fav_artist')
    ], FavArtistEntity);
    return FavArtistEntity;
}());
exports.FavArtistEntity = FavArtistEntity;
