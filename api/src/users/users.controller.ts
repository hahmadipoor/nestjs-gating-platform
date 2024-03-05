import { Body, Controller, Get, HttpStatus, Post, Req, Res } from '@nestjs/common';
import { UsersService } from './users.service';
import { GetBalanceDto } from './dto/get-balance.dto';
import {Response, response} from 'express'

@Controller('user')
export class UsersController {
    
    constructor(private readonly usersService:UsersService){
    }

    @Post('balance')
    async getBalance(@Body() getBalanceDto:GetBalanceDto,@Res() res:Response){
        
        const balance=await this.usersService.getBalance(getBalanceDto)
         return res.json(balance)
    }
    
}
