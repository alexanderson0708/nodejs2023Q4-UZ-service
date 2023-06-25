"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AppModule = void 0;
var common_1 = require("@nestjs/common");
var app_controller_1 = require("./app.controller");
var app_service_1 = require("./app.service");
var album_module_1 = require("./resourses/album/album.module");
var artist_module_1 = require("./resourses/artist/artist.module");
var favourites_module_1 = require("./resourses/favourites/favourites.module");
var track_module_1 = require("./resourses/track/track.module");
var user_module_1 = require("./resourses/user/user.module");
var typeorm_1 = require("@nestjs/typeorm");
var ormconfig_1 = require("./ormconfig");
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        (0, common_1.Module)({
            imports: [
                typeorm_1.TypeOrmModule.forRoot(ormconfig_1.SourceData.options),
                album_module_1.AlbumModule,
                artist_module_1.ArtistModule,
                favourites_module_1.FavouritesModule,
                track_module_1.TrackModule,
                user_module_1.UserModule,
            ],
            controllers: [app_controller_1.AppController],
            providers: [app_service_1.AppService]
        })
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
