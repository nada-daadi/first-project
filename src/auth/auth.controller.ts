import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { loginDto } from './dto/loginDto';
import { SignupDto } from './dto/signUpDto';

@Controller('auth')
export class AuthController {

    constructor(private authService: AuthService) {}

    @Post('signup')
    async signup(@Body() signupDto: SignupDto) {
      return this.authService.signup(signupDto);
    }

    @Post('login')  
    async login(@Body() loginDto: loginDto) {
      return this.authService.login(loginDto);
    }
}
