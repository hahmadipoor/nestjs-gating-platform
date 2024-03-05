import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/user-schema';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { FindUserDto } from './dto/find-user.dto';
import { ChainService } from 'src/chain/chain.service';
import { GetBalanceDto } from './dto/get-balance.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
    private readonly chainService: ChainService
  ) {}

  async create(createUserDto: CreateUserDto,isDeployer:boolean): Promise<User> {
    const createdUser = await this.userModel.create({...createUserDto,balance:1,whiteListCode:1,isDeployer});
    return createdUser;
  }

  async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  async findOne(findUserDto:FindUserDto): Promise<User> {
    const user=this.userModel.findOne(findUserDto).exec();
    return user;
  }

  async delete(address: string) {
    const deletedUser = await this.userModel
      .findOneAndDelete({ address })
      .exec();
    return deletedUser;
  }

   async getBalance(getBalanceDto:GetBalanceDto):Promise<number>{
    const user=await this.userModel.findOne(getBalanceDto);
    if(user){
      return user.balance;
    }
    const balance = await this.chainService.getBalance(getBalanceDto)
    return balance;
  }
}
