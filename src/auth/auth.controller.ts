import { Body, Controller, Inject, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserLoginDto } from './dto/user-login.dto';

@Controller('auth')
export class AuthController {

  constructor(private readonly authService: AuthService) {}


  @Post('login')
  login(
    @Body() userData: UserLoginDto
  ) {
    console.log(userData);
    return this.authService.login(userData);
  }
}
