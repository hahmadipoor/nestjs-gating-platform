import { Body, Controller, Post, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserLoginDto } from './dto/user-login.dto';

@Controller('auth')
export class AuthController {

    constructor(private readonly authService: AuthService) {}

    @Post('login')
    async login(@Body() loginDto: UserLoginDto, @Res() res ) :Promise<{access_token:string}>{
        
       const result=await this.authService.login(loginDto);
       return res.json(result);
    }
}
