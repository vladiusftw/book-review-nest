import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Post,
  Res,
  UseGuards,
} from '@nestjs/common';
import { BooksService } from './books.service';
import { FindOneParams } from './dtos/findOneParams';
import { CreateBookDto } from './dtos/createBookDto';
import { JWTAuthGuard } from 'src/auth/jwt/jwt.guard';
import { PermissionsGuard } from 'src/auth/permissions/permissions.guard';
import { Permissions } from 'src/auth/permissions/permissions.decorator';
import { wrapResponse } from 'src/lib/utils';
import { Response } from 'express';

@Controller('books')
export class BooksController {
  constructor(private readonly bookService: BooksService) {}

  @Get()
  @UseGuards(JWTAuthGuard, PermissionsGuard)
  @Permissions('read:books')
  async getBooks() {
    const data = await this.bookService.getBooks({});
    return wrapResponse(data);
  }

  @Get(':id')
  async getBookById(@Param() params: FindOneParams, @Res() res: Response) {
    const data = await this.bookService.getBook({ id: Number(params.id) });
    if (!data) res.status(HttpStatus.BAD_REQUEST).send(wrapResponse(data));
    return wrapResponse(data);
  }

  @Post()
  @UseGuards(JWTAuthGuard, PermissionsGuard)
  @Permissions('create:books')
  async createBook(@Body() createBookDto: CreateBookDto) {
    const data = await this.bookService.createBook(createBookDto);
    return wrapResponse(data);
  }
}
