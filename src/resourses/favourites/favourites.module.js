"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.FavouritesModule = void 0;
var common_1 = require("@nestjs/common");
var favourites_controller_1 = require("./favourites.controller");
var favourites_service_1 = require("./favourites.service");
var track_module_1 = require("../track/track.module");
var artist_module_1 = require("../artist/artist.module");
var album_module_1 = require("../album/album.module");
var typeorm_1 = require("@nestjs/typeorm");
var favAlbum_entity_1 = require("./entities/favAlbum.entity");
var favArtist_entity_1 = require("./entities/favArtist.entity");
var favTrack_entity_1 = require("./entities/favTrack.entity");
var FavouritesModule = /** @class */ (function () {
    function FavouritesModule() {
    }
    FavouritesModule = __decorate([
        (0, common_1.Module)({
            imports: [
                typeorm_1.TypeOrmModule.forFeature([favAlbum_entity_1.FavAlbumEntity, favArtist_entity_1.FavArtistEntity, favTrack_entity_1.FavTrackEntity]),
                (0, common_1.forwardRef)(function () { return album_module_1.AlbumModule; }),
                (0, common_1.forwardRef)(function () { return track_module_1.TrackModule; }),
                (0, common_1.forwardRef)(function () { return artist_module_1.ArtistModule; }),
            ],
            controllers: [favourites_controller_1.FavouritesController],
            providers: [favourites_service_1.FavouritesService],
            exports: [favourites_service_1.FavouritesService]
        })
    ], FavouritesModule);
    return FavouritesModule;
}());
exports.FavouritesModule = FavouritesModule;
