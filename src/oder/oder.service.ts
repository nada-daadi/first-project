import { Injectable } from '@nestjs/common';
import { CreateOderDto } from './dto/create-oder.dto';
import { UpdateOderDto } from './dto/update-oder.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Oder } from './entities/oder.entity';
import { Model } from 'mongoose';
import { exec } from 'child_process';

@Injectable()
export class OderService {

  constructor(@InjectModel(Oder.name) private OderModel : Model<Oder>) {}

  async create(createOderDto: CreateOderDto):Promise<Oder> {
    return new this.OderModel(createOderDto).save();
  }

  async findAll():Promise<Oder[]> {
    return this.OderModel.find().exec();
  }

  async findById(id: string): Promise<Oder> {
    return this.OderModel.findById(id).exec();
  }

  async update(id: string, updateOderDto: UpdateOderDto) {
    return this.OderModel.findByIdAndUpdate(id,updateOderDto,{new:true}).exec();
  }

  async remove(id: string):Promise<any> {
    return this.OderModel.findByIdAndDelete(id).exec();
  }
}
