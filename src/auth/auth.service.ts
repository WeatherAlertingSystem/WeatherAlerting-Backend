import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { AdminService } from 'src/admin/admin.service';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private adminService: AdminService,
    private jwtService: JwtService,
  ) {}

  async userSignIn(username: string, pass: string): Promise<any> {
    const user = await this.userService.findOne(username);
    const isCorrectPassword = await bcrypt.compare(pass, user.password);
    if (!isCorrectPassword) {
      throw new UnauthorizedException();
    }

    const payload = { username: user.username, role: 'user' };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async adminSignIn(username: string, pass: string): Promise<any> {
    const admin = await this.adminService.findOne(username);
    const isCorrectPassword = await bcrypt.compare(pass, admin.password);
    if (!isCorrectPassword) {
      throw new UnauthorizedException();
    }

    const payload = { username: admin.username, role: 'admin' };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
