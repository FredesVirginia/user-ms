import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { LoginAuthDto } from './dto/login.auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @MessagePattern('auth_register')
  register(@Payload() dto: AuthDto) {
    return this.authService.register(dto);
  }

  @MessagePattern('auth_login')
  login(@Payload() dto: LoginAuthDto) {
    return this.authService.login(dto);
  }

  @MessagePattern('auth_validate')
  async validate(@Payload() payload: { token: string }) {
    return this.authService.validateToken(payload.token);
  }
}
