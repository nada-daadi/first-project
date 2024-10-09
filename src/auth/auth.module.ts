import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from 'src/user/user.module';  // Import UserModule
import { JwtService } from './jwt/jwt.service';  
import { RefreshTokenSchema } from './refresh-token.schema';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
@Module({
  imports: [
    JwtModule.register({
      secret: 'yourSecretKey',  // Replace this with your secret key
      signOptions: { expiresIn: '10h' },  // Token expiration time
    }),
    MongooseModule.forFeature([{ name: 'RefreshToken', schema: RefreshTokenSchema }]),UserModule  // Ensure RefreshToken schema is registered
  ],
   // Import UserModule to access UserService
  providers: [AuthService, JwtService],  // Provide AuthService and JwtService
  controllers: [AuthController],  // Register the AuthController
})
export class AuthModule {}
