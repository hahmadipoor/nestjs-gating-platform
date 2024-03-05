import { Injectable } from '@nestjs/common';
import { User } from 'src/users/schemas/user-schema';
import { UsersService } from 'src/users/users.service';
import { UserLoginDto } from './dto/user-login.dto';
import { DuplicateEntryException } from 'src/common/exceptions/duplicate-entry.exception';
import { ChainService } from 'src/chain/chain.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {

    constructor(
        private readonly usersService: UsersService,
        private readonly chainService: ChainService,
        private jwtService: JwtService
    ){}

    async login(userLoginDto:UserLoginDto):Promise<{ access_token: string }>{
        
        const user=await this.usersService.findOne(userLoginDto);
        if(user){
            throw new DuplicateEntryException(`User ${userLoginDto.address} already exists.`);
        }
        const isDeployer=await this.chainService.isDeployer(userLoginDto.address);
        const createdUser = await this.usersService.create(userLoginDto,isDeployer);
        const payload={
            address:createdUser.address,
            isDeployer:createdUser.isDeployer,
            balance:createdUser.balance
        }
        return {
            access_token: await this.jwtService.signAsync(payload),
        };
    }
}
