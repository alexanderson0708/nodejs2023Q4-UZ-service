import { IsNotEmpty, IsInt, IsString, ValidateIf } from 'class-validator';

export class CreateTrackDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  @ValidateIf((_, value) => value !== null)
  artistId: string | null;

  @IsString()
  @IsNotEmpty()
  @ValidateIf((_, value) => value !== null)
  albumId: string | null;

  @IsInt()
  duration: number;
}
