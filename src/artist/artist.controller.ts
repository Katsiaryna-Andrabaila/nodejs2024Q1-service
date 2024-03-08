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
import { ArtistService } from './artist.service';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { Response } from 'express';

@Controller('artist')
export class ArtistController {
  constructor(private readonly artistService: ArtistService) {}

  @Post()
  @Header('content-type', 'application/json')
  create(@Body() createArtistDto: CreateArtistDto, @Res() res: Response) {
    const correctDto =
      createArtistDto.hasOwnProperty('name') &&
      createArtistDto.hasOwnProperty('grammy') &&
      createArtistDto.name &&
      createArtistDto.grammy;

    if (correctDto) {
      const newArtist = this.artistService.create(createArtistDto);
      res.status(HttpStatus.CREATED).json(newArtist);
    } else {
      res.status(HttpStatus.BAD_REQUEST).send();
    }
  }

  @Get()
  @Header('content-type', 'application/json')
  findAll() {
    return this.artistService.findAll();
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
    const artist = this.artistService.findOne(id);

    if (artist) {
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
    @Body() updateArtistDto: UpdateArtistDto,
    @Res() res: Response,
  ) {
    const updatedArtist = this.artistService.update(id, updateArtistDto);
    const correctDto =
      updateArtistDto.hasOwnProperty('name') &&
      updateArtistDto.hasOwnProperty('grammy') &&
      typeof updateArtistDto.name === 'string' &&
      typeof updateArtistDto.grammy === 'boolean';

    if (correctDto) {
      if (!updatedArtist) {
        res.status(HttpStatus.NOT_FOUND).send();
      } else {
        res.status(HttpStatus.OK).json(updatedArtist);
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
    const artist = this.artistService.remove(id);

    if (artist) {
      res.status(HttpStatus.NO_CONTENT).send();
    } else {
      res.status(HttpStatus.NOT_FOUND).send();
    }
  }
}
