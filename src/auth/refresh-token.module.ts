// refresh-token.module.ts
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { RefreshToken,RefreshTokenSchema } from './refresh-token.schema';
import { RefreshTokenService } from '../refresh-token/refresh-token.service';

  

@Module({
  imports: [
    MongooseModule.forFeature([{ name: RefreshToken.name, schema: RefreshTokenSchema }]),
  ],
  exports: [MongooseModule], // Assurez-vous que le MongooseModule est exporté

})
export class RefreshTokenModule {};