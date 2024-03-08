import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  Header,
  ParseUUIDPipe,
  HttpStatus,
  Res,
} from '@nestjs/common';
import { TrackService } from './track.service';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { Response } from 'express';

@Controller('track')
export class TrackController {
  constructor(private readonly trackService: TrackService) {}

  @Post()
  @Header('content-type', 'application/json')
  create(@Body() createTrackDto: CreateTrackDto, @Res() res: Response) {
    const correctDto =
      createTrackDto.hasOwnProperty('name') &&
      createTrackDto.hasOwnProperty('artistId') &&
      createTrackDto.hasOwnProperty('albumId') &&
      createTrackDto.hasOwnProperty('duration') &&
      createTrackDto.name &&
      createTrackDto.duration;

    if (correctDto) {
      const newTrack = this.trackService.create(createTrackDto);
      res.status(HttpStatus.CREATED).json(newTrack);
    } else {
      res.status(HttpStatus.BAD_REQUEST).send();
    }
  }

  @Get()
  @Header('content-type', 'application/json')
  findAll() {
    return this.trackService.findAll();
  }

  @Get(':id')
  @Header('content-type', 'application/json')
  findOne(
    @Param(
      'id',
      new ParseUUIDPipe({ errorHttpStatusCode: HttpStatus.BAD_REQUEST }),
    )
    id: string,
    @Res() res: Response,
  ) {
    const track = this.trackService.findOne(id);
    if (track) {
      res.status(HttpStatus.OK).json([]);
    } else {
      res.status(HttpStatus.NOT_FOUND).send();
    }
  }

  @Put(':id')
  @Header('content-type', 'application/json')
  update(
    @Param(
      'id',
      new ParseUUIDPipe({ errorHttpStatusCode: HttpStatus.BAD_REQUEST }),
    )
    id: string,
    @Body() updateTrackDto: UpdateTrackDto,
    @Res() res: Response,
  ) {
    const updatedTrack = this.trackService.update(id, updateTrackDto);
    const correctDto =
      updateTrackDto.hasOwnProperty('name') &&
      updateTrackDto.hasOwnProperty('artistId') &&
      updateTrackDto.hasOwnProperty('albumId') &&
      updateTrackDto.hasOwnProperty('duration') &&
      updateTrackDto.name &&
      updateTrackDto.duration;

    if (correctDto) {
      if (!updatedTrack) {
        res.status(HttpStatus.NOT_FOUND).send();
      } else {
        res.status(HttpStatus.OK).json(updatedTrack);
      }
    } else {
      res.status(HttpStatus.BAD_REQUEST).send();
    }
  }

  @Delete(':id')
  @Header('content-type', 'application/json')
  remove(
    @Param(
      'id',
      new ParseUUIDPipe({ errorHttpStatusCode: HttpStatus.BAD_REQUEST }),
    )
    id: string,
    @Res() res: Response,
  ) {
    const track = this.trackService.remove(id);
    if (track) {
      res.status(HttpStatus.NO_CONTENT).send();
    } else {
      res.status(HttpStatus.NOT_FOUND).send();
    }
  }
}
