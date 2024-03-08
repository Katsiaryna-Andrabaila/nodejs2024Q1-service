import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  ParseUUIDPipe,
  HttpStatus,
  Res,
  Header,
} from '@nestjs/common';
import { AlbumService } from './album.service';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { Response } from 'express';

@Controller('album')
export class AlbumController {
  constructor(private readonly albumService: AlbumService) {}

  @Post()
  @Header('content-type', 'application/json')
  create(@Body() createAlbumDto: CreateAlbumDto, @Res() res: Response) {
    const correctDto =
      createAlbumDto.hasOwnProperty('name') &&
      createAlbumDto.hasOwnProperty('year') &&
      createAlbumDto.hasOwnProperty('artistId') &&
      createAlbumDto.name &&
      createAlbumDto.year;

    if (correctDto) {
      const newAlbum = this.albumService.create(createAlbumDto);
      res.status(HttpStatus.CREATED).json(newAlbum);
    } else {
      res.status(HttpStatus.BAD_REQUEST).send();
    }
  }

  @Get()
  @Header('content-type', 'application/json')
  findAll() {
    return this.albumService.findAll();
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
    const album = this.albumService.findOne(id);
    if (album) {
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
    @Body() updateAlbumDto: UpdateAlbumDto,
    @Res() res: Response,
  ) {
    const updatedAlbum = this.albumService.update(id, updateAlbumDto);
    const correctDto =
      updateAlbumDto.hasOwnProperty('name') &&
      updateAlbumDto.hasOwnProperty('year') &&
      updateAlbumDto.hasOwnProperty('artistId') &&
      typeof updateAlbumDto.name === 'string' &&
      typeof updateAlbumDto.year === 'number';

    if (correctDto) {
      if (updatedAlbum) {
        res.status(HttpStatus.OK).json(updatedAlbum);
      } else {
        res.status(HttpStatus.NOT_FOUND).send();
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
    const album = this.albumService.remove(id);

    if (album) {
      res.status(HttpStatus.NO_CONTENT).send();
    } else {
      res.status(HttpStatus.NOT_FOUND).send();
    }
  }
}
