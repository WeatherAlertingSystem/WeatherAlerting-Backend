import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async signIn(username: string, pass: string): Promise<any> {
    const user = await this.userService.findOne(username);
    const isCorrectPassword = await bcrypt.compare(pass, user.password);
    if (!isCorrectPassword) {
      throw new UnauthorizedException();
    }

    const payload = { username: user.username };

    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
