"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AlbumModule = void 0;
var common_1 = require("@nestjs/common");
var album_controller_1 = require("./album.controller");
var album_service_1 = require("./album.service");
var track_module_1 = require("../track/track.module");
var typeorm_1 = require("@nestjs/typeorm");
var album_entity_1 = require("./entities/album.entity");
var artist_entity_1 = require("../artist/entities/artist.entity");
var AlbumModule = /** @class */ (function () {
    function AlbumModule() {
    }
    AlbumModule = __decorate([
        (0, common_1.Module)({
            imports: [
                typeorm_1.TypeOrmModule.forFeature([album_entity_1.AlbumEntity, artist_entity_1.ArtistEntity]),
                (0, common_1.forwardRef)(function () { return track_module_1.TrackModule; }),
            ],
            controllers: [album_controller_1.AlbumController],
            providers: [album_service_1.AlbumService],
            exports: [album_service_1.AlbumService]
        })
    ], AlbumModule);
    return AlbumModule;
}());
exports.AlbumModule = AlbumModule;
