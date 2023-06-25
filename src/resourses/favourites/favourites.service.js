"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.FavouritesService = void 0;
var common_1 = require("@nestjs/common");
var typeorm_1 = require("@nestjs/typeorm");
var favAlbum_entity_1 = require("./entities/favAlbum.entity");
var favArtist_entity_1 = require("./entities/favArtist.entity");
var favTrack_entity_1 = require("./entities/favTrack.entity");
var FavouritesService = /** @class */ (function () {
    function FavouritesService(favAlbumRepo, favArtistRepo, favTrackRepo) {
        this.favAlbumRepo = favAlbumRepo;
        this.favArtistRepo = favArtistRepo;
        this.favTrackRepo = favTrackRepo;
    }
    FavouritesService.prototype.findAll = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a, favAlbum, favArtist, favTrack, albums, artists, tracks;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, Promise.all([
                            this.favAlbumRepo.find({ relations: { album: true } }),
                            this.favArtistRepo.find({ relations: { artist: true } }),
                            this.favTrackRepo.find({ relations: { track: true } }),
                        ])];
                    case 1:
                        _a = _b.sent(), favAlbum = _a[0], favArtist = _a[1], favTrack = _a[2];
                        albums = favAlbum.map(function (el) { return el.album; });
                        artists = favArtist.map(function (el) { return el.artist; });
                        tracks = favTrack.map(function (el) { return el.track; });
                        return [2 /*return*/, { albums: albums, artists: artists, tracks: tracks }];
                }
            });
        });
    };
    FavouritesService.prototype.addAlbum = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var album, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.favAlbumRepo.create({ albumId: id })];
                    case 1:
                        album = _a.sent();
                        _a.label = 2;
                    case 2:
                        _a.trys.push([2, 4, , 5]);
                        return [4 /*yield*/, this.favAlbumRepo.save(album)];
                    case 3:
                        _a.sent();
                        return [2 /*return*/, { message: "Album with id:".concat(id, " has been added to favourites") }];
                    case 4:
                        e_1 = _a.sent();
                        throw new common_1.HttpException("Album with id: ".concat(id, " does not exist"), 422);
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    FavouritesService.prototype.addTrack = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var track, e_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.favTrackRepo.create({ trackId: id })];
                    case 1:
                        track = _a.sent();
                        _a.label = 2;
                    case 2:
                        _a.trys.push([2, 4, , 5]);
                        return [4 /*yield*/, this.favTrackRepo.save(track)];
                    case 3:
                        _a.sent();
                        return [2 /*return*/, { message: "Track with id:".concat(id, " has been added to favourites") }];
                    case 4:
                        e_2 = _a.sent();
                        throw new common_1.HttpException("Track with id: ".concat(id, " does not exist"), 422);
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    FavouritesService.prototype.addArtist = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var artist, e_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.favArtistRepo.create({ artistId: id })];
                    case 1:
                        artist = _a.sent();
                        _a.label = 2;
                    case 2:
                        _a.trys.push([2, 4, , 5]);
                        return [4 /*yield*/, this.favArtistRepo.save(artist)];
                    case 3:
                        _a.sent();
                        return [2 /*return*/, { message: "Artist with id:".concat(id, " has been added to favourites") }];
                    case 4:
                        e_3 = _a.sent();
                        throw new common_1.HttpException("Artist with id: ".concat(id, " does not exist"), 422);
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    FavouritesService.prototype.removeAlbum = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var album;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.favAlbumRepo["delete"]({ albumId: id })];
                    case 1:
                        album = _a.sent();
                        if (!album.affected)
                            throw this.notFound(id, 'album');
                        return [2 /*return*/, { message: "Album with id:".concat(id, " has been removed from favourites") }];
                }
            });
        });
    };
    FavouritesService.prototype.removeArtist = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var artist;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.favArtistRepo["delete"]({ artistId: id })];
                    case 1:
                        artist = _a.sent();
                        if (!artist.affected)
                            throw this.notFound(id, 'artist');
                        return [2 /*return*/, { message: "Artist with id:".concat(id, " has been removed from favourites") }];
                }
            });
        });
    };
    FavouritesService.prototype.removeTrack = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var track;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.favTrackRepo["delete"]({ trackId: id })];
                    case 1:
                        track = _a.sent();
                        if (!track.affected)
                            throw this.notFound(id, 'track');
                        return [2 /*return*/, { message: "Track with id:".concat(id, " has been removed from favourites") }];
                }
            });
        });
    };
    FavouritesService.prototype.notFound = function (id, entity) {
        throw new common_1.HttpException("".concat(entity.toUpperCase(), " with id:").concat(id, " does not exist in favourites"), common_1.HttpStatus.NOT_FOUND);
    };
    FavouritesService = __decorate([
        (0, common_1.Injectable)(),
        __param(0, (0, typeorm_1.InjectRepository)(favAlbum_entity_1.FavAlbumEntity)),
        __param(1, (0, typeorm_1.InjectRepository)(favArtist_entity_1.FavArtistEntity)),
        __param(2, (0, typeorm_1.InjectRepository)(favTrack_entity_1.FavTrackEntity))
    ], FavouritesService);
    return FavouritesService;
}());
exports.FavouritesService = FavouritesService;
