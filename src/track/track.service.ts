import { Injectable } from '@nestjs/common';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { db } from '../db/entities/db.entity';

@Injectable()
export class TrackService {
  create(createTrackDto: CreateTrackDto) {
    return db.addTrack(createTrackDto);
  }

  findAll() {
    return db.getTracks();
  }

  findOne(id: string) {
    return db.getTrackById(id);
  }

  update(id: string, updateTrackDto: UpdateTrackDto) {
    return db.updateTrack(id, updateTrackDto);
  }

  remove(id: string) {
    return db.deleteTrack(id);
  }
}
