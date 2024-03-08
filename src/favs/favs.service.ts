import { Injectable } from '@nestjs/common';
import { Favorites, db } from '../db/entities/db.entity';

@Injectable()
export class FavsService {
  create(key: keyof Favorites, id: string) {
    return db.addFav(key, id);
  }

  findAll() {
    return db.getFavs();
  }

  remove(key: keyof Favorites, id: string) {
    return db.deleteFav(key, id);
  }
}
