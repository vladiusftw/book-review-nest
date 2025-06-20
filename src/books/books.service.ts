import { Injectable } from '@nestjs/common';
import { Book, Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class BooksService {
  constructor(private prisma: PrismaService) {}

  async createBook(data: Prisma.BookCreateInput): Promise<Book> {
    return this.prisma.book.create({ data });
  }

  async getBook(
    bookWhereUniqueInput: Prisma.BookWhereUniqueInput,
  ): Promise<Book | null> {
    return this.prisma.book.findUnique({ where: bookWhereUniqueInput });
  }

  async getBooks(params: {
    skip?: number;
    take?: number;
    where?: Prisma.BookWhereInput;
    orderBy?: Prisma.BookOrderByWithRelationInput;
  }): Promise<Book[]> {
    const { skip, take, where, orderBy } = params;
    return this.prisma.book.findMany({
      skip,
      take,
      where,
      orderBy,
    });
  }
}
