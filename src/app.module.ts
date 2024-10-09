import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { ProductModule } from './product/product.module';
import { OderModule } from './oder/oder.module';
import { MongooseModule } from '@nestjs/mongoose'; 
import { AuthModule } from './auth/auth.module';
import { RefreshTokenService } from './refresh-token/refresh-token.service';
import { RefreshTokenModule } from './refresh-token/refresh-token.module';

@Module({
  imports: [UserModule, ProductModule, OderModule,MongooseModule.forRoot('mongodb://localhost/nest'), AuthModule, RefreshTokenModule,],

  controllers: [AppController],
  providers: [AppService, RefreshTokenService],
})
export class AppModule {} 
