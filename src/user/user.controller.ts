import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  HttpCode,
  Header,
  Res,
  ParseUUIDPipe,
  HttpStatus,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Response } from 'express';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @Header('content-type', 'application/json')
  create(@Body() createUserDto: CreateUserDto, @Res() res: Response) {
    if (
      createUserDto.hasOwnProperty('login') &&
      createUserDto.hasOwnProperty('password') &&
      createUserDto.login &&
      createUserDto.password
    ) {
      const newUser = this.userService.create(createUserDto);
      res.status(HttpStatus.CREATED).json(newUser);
    } else {
      res.status(HttpStatus.BAD_REQUEST).send();
    }
  }

  @Get()
  @Header('content-type', 'application/json')
  findAll() {
    return this.userService.findAll();
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
    const user = this.userService.findOne(id);
    if (user) {
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
    @Body() updateUserDto: UpdateUserDto,
    @Res() res: Response,
  ) {
    const updatedUser = this.userService.update(id, updateUserDto);
    if (
      updateUserDto.hasOwnProperty('oldPassword') &&
      updateUserDto.hasOwnProperty('newPassword') &&
      updateUserDto.oldPassword &&
      updateUserDto.newPassword
    ) {
      if (updatedUser && updatedUser === 'wrong') {
        res.status(HttpStatus.FORBIDDEN).send();
      } else if (!updatedUser) {
        res.status(HttpStatus.NOT_FOUND).send();
      } else {
        res.status(HttpStatus.OK).json(updatedUser);
      }
    } else {
      res.status(HttpStatus.BAD_REQUEST).send();
    }
  }

  @Delete(':id')
  @Header('content-type', 'application/json')
  @HttpCode(204)
  remove(
    @Param(
      'id',
      new ParseUUIDPipe({ errorHttpStatusCode: HttpStatus.BAD_REQUEST }),
    )
    id: string,
    @Res() res: Response,
  ) {
    const user = this.userService.remove(id);
    if (user) {
      res.status(HttpStatus.NO_CONTENT).send();
    } else {
      res.status(HttpStatus.NOT_FOUND).send();
    }
  }
}
