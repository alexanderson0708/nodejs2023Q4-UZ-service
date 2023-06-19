"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.TrackModule = void 0;
var common_1 = require("@nestjs/common");
var track_controller_1 = require("./track.controller");
var track_service_1 = require("./track.service");
var typeorm_1 = require("@nestjs/typeorm");
var track_entity_1 = require("./entities/track.entity");
var album_entity_1 = require("../album/entities/album.entity");
var artist_entity_1 = require("../artist/entities/artist.entity");
var TrackModule = /** @class */ (function () {
    function TrackModule() {
    }
    TrackModule = __decorate([
        (0, common_1.Module)({
            imports: [typeorm_1.TypeOrmModule.forFeature([track_entity_1.TrackEntity, album_entity_1.AlbumEntity, artist_entity_1.ArtistEntity])],
            controllers: [track_controller_1.TrackController],
            providers: [track_service_1.TrackService],
            exports: [track_service_1.TrackService]
        })
    ], TrackModule);
    return TrackModule;
}());
exports.TrackModule = TrackModule;
