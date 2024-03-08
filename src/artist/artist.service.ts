import { Injectable } from '@nestjs/common';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { db } from '../db/entities/db.entity';

@Injectable()
export class ArtistService {
  create(createArtistDto: CreateArtistDto) {
    return db.addArtist(createArtistDto);
  }

  findAll() {
    return db.getArtists();
  }

  findOne(id: string) {
    return db.getArtistById(id);
  }

  update(id: string, updateArtistDto: UpdateArtistDto) {
    return db.updateArtist(id, updateArtistDto);
  }

  remove(id: string) {
    return db.deleteArtist(id);
  }
}
