import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entity/user.entity';
import { Repository } from 'typeorm';
import { AuthDto } from './dto/auth.dto';
import * as bcrypt from 'bcrypt';
import { LoginAuthDto } from './dto/login.auth.dto';
@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private userRepo: Repository<User>,
    private jwt: JwtService,
  ) {}


  async register(dto : AuthDto){
    const hashed = await bcrypt.hash(dto.password , 10);
    const user = this.userRepo.create({ ...dto , password : hashed})
    await this.userRepo.save(user);
    return this.signToken(user)
  }


  async login(dto: LoginAuthDto) {
  const user = await this.userRepo.findOneBy({ email: dto.email });

  if (!user || !(await bcrypt.compare(dto.password, user.password))) {
    throw new UnauthorizedException('Credenciales incorrectas');
  }

  const token = await this.signToken(user);

  return {
    access_token: token, // 👈 estándar JWT
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    },
  };
}


  async validateToken(token: string) {
  try {
    const decoded = this.jwt.verify(token, { secret: 'super-secret-jwt' });
    return { valid: true, user: decoded };
  } catch (e) {
    return { valid: false, error: e.message };
  }
}



  private async signToken(user : User){
    const payload = { sub : user.id , email : user.email , role : user.role};
    const token = await this.jwt.signAsync(payload);
    return {access_token : token}
  }
}
