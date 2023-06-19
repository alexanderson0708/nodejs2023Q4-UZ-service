"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.ArtistModule = void 0;
var common_1 = require("@nestjs/common");
var artist_controller_1 = require("./artist.controller");
var artist_service_1 = require("./artist.service");
var album_module_1 = require("../album/album.module");
var track_module_1 = require("../track/track.module");
var typeorm_1 = require("@nestjs/typeorm");
var artist_entity_1 = require("./entities/artist.entity");
var ArtistModule = /** @class */ (function () {
    function ArtistModule() {
    }
    ArtistModule = __decorate([
        (0, common_1.Module)({
            imports: [
                typeorm_1.TypeOrmModule.forFeature([artist_entity_1.ArtistEntity]),
                (0, common_1.forwardRef)(function () { return album_module_1.AlbumModule; }),
                (0, common_1.forwardRef)(function () { return track_module_1.TrackModule; }),
            ],
            controllers: [artist_controller_1.ArtistController],
            providers: [artist_service_1.ArtistService],
            exports: [artist_service_1.ArtistService]
        })
    ], ArtistModule);
    return ArtistModule;
}());
exports.ArtistModule = ArtistModule;
