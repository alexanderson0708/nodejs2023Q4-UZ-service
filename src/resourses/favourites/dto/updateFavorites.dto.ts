import { PartialType } from '@nestjs/mapped-types';
import { CreateFavouritesDto } from './createFavourites.dto';

export class UpdateFavoritesDto extends PartialType(CreateFavouritesDto) {}
