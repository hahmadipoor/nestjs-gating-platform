import { Body, Controller, Get, Post, UploadedFiles, UseGuards,  } from '@nestjs/common';
import { VideosService } from './videos.service';
import { AuthGuard } from 'src/common/guards/auth.guard';
import { isDeployer } from 'src/common/guards/is-admin.guard';
import {  FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { FileSizeValidationPipe } from 'src/common/pipes/file-size.validator';
import { diskStorage } from 'multer';
import {   UseInterceptors, UploadedFile } from '@nestjs/common'

@Controller('videos')
export class VideosController {

    constructor(private readonly videosService:VideosService){        
    }
    
    @UseGuards(AuthGuard)
    @Get()
    async getVideos(){
        
    }

    @UseGuards(AuthGuard)
    @UseGuards(isDeployer)
    @Post('upload-video')
    @UseInterceptors(FileInterceptor('file', {
        storage: diskStorage({
          destination: './uploads'
          , filename: (req, file, cb) => {
            // Generating a 32 random chars long string
            const randomName = (Math.round(Math.random() * 16)).toString(16)
            //Calling the callback passing the random name generated with the original extension name
            cb(null, `${randomName}${(file.originalname)}`)
          }
        })
      }))
      async upload(@UploadedFile() file) {
        this.videosService.insertFileToDatabase(file)
    }
}
