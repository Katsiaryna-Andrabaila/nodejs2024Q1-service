import {
  Controller,
  Get,
  Post,
  Param,
  Delete,
  Header,
  ParseUUIDPipe,
  HttpStatus,
  Res,
} from '@nestjs/common';
import { FavsService } from './favs.service';
import { Response } from 'express';

@Controller('favs')
export class FavsController {
  constructor(private readonly favsService: FavsService) {}

  @Get()
  @Header('content-type', 'application/json')
  findAll() {
    return this.favsService.findAll();
  }

  @Post('track/:id')
  @Header('content-type', 'application/json')
  createTrackInFavs(
    @Param(
      'id',
      new ParseUUIDPipe({ errorHttpStatusCode: HttpStatus.BAD_REQUEST }),
    )
    id: string,
    @Res() res: Response,
  ) {
    const result = this.favsService.create('tracks', id);
    result
      ? res.status(HttpStatus.CREATED).json(result)
      : res.status(HttpStatus.UNPROCESSABLE_ENTITY).send();
  }

  @Post('artist/:id')
  @Header('content-type', 'application/json')
  createArtistInFavs(
    @Param(
      'id',
      new ParseUUIDPipe({ errorHttpStatusCode: HttpStatus.BAD_REQUEST }),
    )
    id: string,
    @Res() res: Response,
  ) {
    const result = this.favsService.create('artists', id);
    result
      ? res.status(HttpStatus.CREATED).json(result)
      : res.status(HttpStatus.UNPROCESSABLE_ENTITY).send();
  }

  @Post('album/:id')
  @Header('content-type', 'application/json')
  createAlbumInFavs(
    @Param(
      'id',
      new ParseUUIDPipe({ errorHttpStatusCode: HttpStatus.BAD_REQUEST }),
    )
    id: string,
    @Res() res: Response,
  ) {
    const result = this.favsService.create('albums', id);
    result
      ? res.status(HttpStatus.CREATED).json(result)
      : res.status(HttpStatus.UNPROCESSABLE_ENTITY).send();
  }

  @Delete('track/:id')
  @Header('content-type', 'application/json')
  removeTrackFromFavs(
    @Param(
      'id',
      new ParseUUIDPipe({ errorHttpStatusCode: HttpStatus.BAD_REQUEST }),
    )
    id: string,
    @Res() res: Response,
  ) {
    const result = this.favsService.remove('tracks', id);
    result
      ? res.status(HttpStatus.NO_CONTENT).json(result)
      : res.status(HttpStatus.NOT_FOUND).send();
  }

  @Delete('artist/:id')
  @Header('content-type', 'application/json')
  removeArtistFromFavs(
    @Param(
      'id',
      new ParseUUIDPipe({ errorHttpStatusCode: HttpStatus.BAD_REQUEST }),
    )
    id: string,
    @Res() res: Response,
  ) {
    const result = this.favsService.remove('artists', id);
    result
      ? res.status(HttpStatus.NO_CONTENT).json(result)
      : res.status(HttpStatus.NOT_FOUND).send();
  }

  @Delete('album/:id')
  @Header('content-type', 'application/json')
  removeAlbumFromFavs(
    @Param(
      'id',
      new ParseUUIDPipe({ errorHttpStatusCode: HttpStatus.BAD_REQUEST }),
    )
    id: string,
    @Res() res: Response,
  ) {
    const result = this.favsService.remove('albums', id);
    result
      ? res.status(HttpStatus.NO_CONTENT).json(result)
      : res.status(HttpStatus.NOT_FOUND).send();
  }
}
