import { IsOptional } from 'class-validator';

export class CreateFavouritesDto {
  @IsOptional()
  artists: string[];

  @IsOptional()
  albums: string[];

  @IsOptional()
  tracks: string[];
}
