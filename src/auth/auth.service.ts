import { Injectable, BadRequestException, UnauthorizedException } from '@nestjs/common';
import { UserService } from 'src/user/user.service';  // Import UserService
import { v4 as uuidv4 } from 'uuid';
import * as bcrypt from 'bcryptjs';
import { SignupDto } from './dto/signUpDto';
import { loginDto } from './dto/loginDto';
import { JwtService } from '@nestjs/jwt'; // Proper import of JwtService
import { InjectModel } from '@nestjs/mongoose'; // Mongoose injection
import { Model } from 'mongoose';
import { RefreshToken } from './refresh-token.schema'; // Import your RefreshToken schema

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,  // Inject JwtService properly
    @InjectModel('RefreshToken') private readonly refreshTokenModel: Model<RefreshToken> // Inject Mongoose model
  ) {}

  async signup(signupData: SignupDto) {
    const { email, password, name } = signupData;

    const emailInUse = await this.userService.findOne(email);
    if (emailInUse) {
      throw new BadRequestException('Email already in use');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await this.userService.create({
      name,
      email,
      password: hashedPassword,
    });

    return {
      message: 'User registered successfully',
      user: { email: newUser.email, name: newUser.name },
    };
  }

  async login(credentiales: loginDto) {
    const { email, password } = credentiales;

    const user = await this.userService.findOne(email);
    if (!user) {
      throw new UnauthorizedException('Wrong credentials');
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      throw new UnauthorizedException('Wrong credentials');
    }

    const tokens = await this.generateUserTokens(user.id.toString());
    return {
      ...tokens,
      userId: user.id,
    };
  }

  async generateUserTokens(userId: string) {
    const accessToken = this.jwtService.sign({ userId }, { expiresIn: '10h' });
    const refreshToken = uuidv4(); // Generate a UUID for the refresh token

    await this.storeRefreshToken(refreshToken, userId);

    return {
      accessToken,
      refreshToken,
    };
  }

  async storeRefreshToken(token: string, userId: string) { // Token should be a string
    const expiryDate = new Date();
    expiryDate.setDate(expiryDate.getDate() + 3);

    await this.refreshTokenModel.updateOne(
      { userId },
      { $set: { expiryDate, token } },
      { upsert: true } // Insert if it doesn't exist, update if it does
    );
  }

  async refreshTokens(refreshToken: string) {
    const token = await this.refreshTokenModel.findOne({
      token: refreshToken,
      expiryDate: { $gte: new Date() },
    });

    if (!token) {
      throw new UnauthorizedException('Refresh token is invalid');
    }

    return this.generateUserTokens(token.userId);
  }
}
