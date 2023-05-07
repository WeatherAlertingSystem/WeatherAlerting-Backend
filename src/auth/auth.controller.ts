import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { Public } from './auth.guard';
import { AuthService } from './auth.service';
import { signInDto } from './dto/sign-in.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('login')
  signIn(@Body() signInDto: signInDto) {
    return this.authService.signIn(signInDto.username, signInDto.password);
  }
}
