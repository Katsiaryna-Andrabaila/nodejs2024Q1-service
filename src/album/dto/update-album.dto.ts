import { PartialType } from '@nestjs/swagger';
import { CreateAlbumDto } from './create-album.dto';

export class UpdateAlbumDto extends PartialType(CreateAlbumDto) {
  name: string;
  year: number;
  artistId: string | null; // refers to Artist
}
