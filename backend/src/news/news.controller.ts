import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  UseGuards,
  UseInterceptors,
  UploadedFile,
  Query,
  Request,
  Delete,
  ParseIntPipe, // Tambahan untuk konversi ID otomatis
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { NewsService } from './news.service';
import { CreateNewsDto } from './dto/create-news.dto';
import { UpdateNewsDto } from './dto/update-news.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('news')
export class NewsController {
  constructor(private readonly newsService: NewsService) {}

  // DILINDUNGI: Hanya admin bisa create
  @UseGuards(AuthGuard('jwt'))
  @Post()
  @UseInterceptors(FileInterceptor('thumbnail'))
  create(
    @Body() createNewsDto: CreateNewsDto,
    @UploadedFile() file: Express.Multer.File,
    @Request() req: any,
  ) {
    return this.newsService.create(createNewsDto, file, req.user.userId);
  }

  // PUBLIK: Semua orang bisa list
  @Get()
  findAll(
    @Query('page') page: string = '1',
    @Query('limit') limit: string = '10',
  ) {
    const pageNumber = parseInt(page, 10) || 1;
    const limitNumber = parseInt(limit, 10) || 10;
    return this.newsService.findAll(pageNumber, limitNumber);
  }

  // PUBLIK: Semua orang bisa baca detail
  @Get(':term')
  findOne(@Param('term') term: string) {
    const parsed = parseInt(term, 10);
    return this.newsService.findOne(isNaN(parsed) ? term : parsed);
  }

  // DILINDUNGI: Hanya admin bisa update
  @UseGuards(AuthGuard('jwt'))
  @Patch(':id')
  @UseInterceptors(FileInterceptor('thumbnail'))
  update(
    @Param('id', ParseIntPipe) id: number, // Otomatis konversi ke number
    @Body() updateNewsDto: UpdateNewsDto,
    @UploadedFile() file?: Express.Multer.File,
  ) {
    return this.newsService.update(id, updateNewsDto, file);
  }

  // DILINDUNGI: Hanya admin bisa delete
  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    // Otomatis konversi ke number
    return this.newsService.remove(id);
  }
}
