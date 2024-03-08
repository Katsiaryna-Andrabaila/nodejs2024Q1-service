import { Injectable } from '@nestjs/common';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { db } from '../db/entities/db.entity';

@Injectable()
export class AlbumService {
  create(createAlbumDto: CreateAlbumDto) {
    return db.addAlbum(createAlbumDto);
  }

  findAll() {
    return db.getAlbums();
  }

  findOne(id: string) {
    return db.getAlbumById(id);
  }

  update(id: string, updateAlbumDto: UpdateAlbumDto) {
    return db.updateAlbum(id, updateAlbumDto);
  }

  remove(id: string) {
    return db.deleteAlbum(id);
  }
}
