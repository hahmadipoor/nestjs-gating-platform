import { Module } from '@nestjs/common';
import { VideosService } from './videos.service';
import { VideosController } from './videos.controller';
import { Mongoose } from 'mongoose';
import { MongooseModule } from '@nestjs/mongoose';
import { Video, VideoSchema } from './schemas/video-schema';

@Module({
  imports:[MongooseModule.forFeature([{ name: Video.name, schema: VideoSchema }])],
  providers: [VideosService],
  controllers: [VideosController]
})
export class VideosModule {}
