import { Injectable , NotFoundException, InternalServerErrorException} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Model } from 'mongoose';


@Injectable()
export class UserService {
 
  constructor(@InjectModel(User.name) private UserModel: Model<User>){}
 

  async create(createUserDto: CreateUserDto): Promise<User> {
    const createdUser = new this.UserModel(createUserDto);
    return createdUser.save();
  }

  async findAll(): Promise<User[]> {
    return this.UserModel.find().exec();
  }
  async findOne(email: string): Promise<User> {
  
    return this.UserModel.findOne({email}).exec();
  }

  /*async findById(id: string): Promise<User> {
  
    return this.UserModel.findById(id).exec();
    
  }
*/
  update(id: string, updateUserDto: UpdateUserDto) {
    return this.UserModel.findByIdAndUpdate(id,updateUserDto,{rew:true}).exec();
  }

  remove(id: string):Promise<User> {
    return this.UserModel.findByIdAndDelete(id).exec();
  }
}
