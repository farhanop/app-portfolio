import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { NewsModule } from './news/news.module';
import { GalleriesModule } from './galleries/galleries.module';
import { DocumentsModule } from './documents/documents.module';
import { OrgPositionsModule } from './org-positions/org-positions.module';
import { BiroProfilesModule } from './biro-profiles/biro-profiles.module';
import { ExternalLinksModule } from './external-links/external-links.module';
import { User } from './users/entities/user.entity';
import { OrgPosition } from './org-positions/entities/org-position.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get<string>('DB_HOST'),
        port: configService.get<number>('DB_PORT'),
        username: configService.get<string>('DB_USERNAME'),
        password: configService.get<string>('DB_PASSWORD'),
        database: configService.get<string>('DB_DATABASE'),
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        synchronize: true, // ⚠️ HANYA UNTUK DEV: Otomatis buat tabel dari kodingan
      }),
      inject: [ConfigService],
    }),
    TypeOrmModule.forFeature([User, OrgPosition]),

    UsersModule,

    AuthModule,

    NewsModule,

    GalleriesModule,

    DocumentsModule,

    OrgPositionsModule,

    BiroProfilesModule,

    ExternalLinksModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
