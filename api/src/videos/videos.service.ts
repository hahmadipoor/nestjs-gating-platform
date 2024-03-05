import { Injectable } from '@nestjs/common';
import { Video } from './schemas/video-schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class VideosService {

    constructor(@InjectModel(Video.name) private readonly videoModel: Model<Video>){
    }
    
    async insertFileToDatabase(filename: string) {
        const createdFile = await this.videoModel.create({name:filename, whiteListCode:1});
        return createdFile;
    }

}
