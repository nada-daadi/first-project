import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Product } from 'src/product/entities/product.entity';
import { Model } from 'mongoose';

@Injectable()
export class ProductService {
  constructor(@InjectModel(Product.name) private ProductModel: Model<Product>){}

  async create (CreateProductDto: CreateProductDto):Promise<Product>{
    const createProduct =new this.ProductModel(CreateProductDto);
    return createProduct.save();
  }

  findAll() {
    return this.ProductModel.find().exec();
  }

 
  
  

  async findById(id:string):Promise<Product>{
    return this.ProductModel.findById(id);
  }

  update(id: string, updateProductDto: UpdateProductDto) {
    return this.ProductModel.findByIdAndUpdate(id,updateProductDto,{rew:true}).exec();
  }

  remove(id: string) {
    return this.ProductModel.findByIdAndDelete(id).exec();
  }
}
