import { Injectable } from '@nestjs/common';
const {Web3} = require('web3');
import { ABI } from './ABI';
import { GetBalanceDto } from 'src/users/dto/get-balance.dto';

@Injectable()
export class ChainService {

    web3; 
    contract;
    constructor(){
        this.web3=new Web3(process.env.SEPOLIA_NODE_URL);
        this.contract = new this.web3.eth.Contract(ABI,process.env.CONTRACT_ADDRESS);
    }

    async isDeployer(address:string):Promise<boolean>{
        const isDeployer = await this.contract.methods["isDeployer"](address).call();
        return isDeployer
    }

    async getBalance(getBalanceDto:GetBalanceDto):Promise<number>{
        const balance = await this.contract.methods["balanceOf"](getBalanceDto.address).call();
        return Number(balance);
    }
}
