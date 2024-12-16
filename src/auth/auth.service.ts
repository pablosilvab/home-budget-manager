
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {

    constructor(
        private usersService: UsersService,
        private jwtService: JwtService
    ) { }

    async signIn(
        username: string,
        password: string,
    ): Promise<{ access_token: string }> {
        const user = await this.usersService.findOne(username);
        if (!user) {
            throw new UnauthorizedException('Invalid credentials');
          }
      
          const isPasswordValid = await bcrypt.compare(password, user.password);
          if (!isPasswordValid) {
            throw new UnauthorizedException('Invalid credentials');
          }
      
          const payload = { sub: user.id, username: user.username };
          return {
            access_token: await this.jwtService.signAsync(payload),
          };
    }

    async signUp(username: any, password: any) {
        return await this.usersService.createUser(username, password);
    }

}
