import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { Role } from '@prisma/client';

interface SignUpInput {
  email: string;
  phone: string;
  password: string;
  name?: string;
  age?: number;
  role?: Role;
}

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  private buildTokenPayload(user: { id: string; email: string; role: Role }) {
    return { sub: user.id, email: user.email, role: user.role };
  }

  async signUp(input: SignUpInput) {
    const exists = await this.prisma.user.findFirst({
      where: { OR: [{ email: input.email }, { phone: input.phone }] },
      select: { id: true },
    });
    if (exists) throw new BadRequestException('User already exists');

    const hashed = await bcrypt.hash(input.password, 10);
    const created = await this.prisma.user.create({
      data: { ...input, password: hashed, role: input.role ?? 'USER' },
    });
    const token = await this.jwtService.signAsync(this.buildTokenPayload(created));
    const { password, ...safe } = created as any;
    return { user: safe, accessToken: token };
  }

  async signIn(emailOrPhone: string, password: string) {
    const user = await this.prisma.user.findFirst({
      where: { OR: [{ email: emailOrPhone }, { phone: emailOrPhone }] },
    });
    if (!user) throw new UnauthorizedException('Invalid credentials');
    const valid = await bcrypt.compare(password, user.password);
    if (!valid) throw new UnauthorizedException('Invalid credentials');
    const token = await this.jwtService.signAsync(this.buildTokenPayload(user));
    const { password: _omitted, ...safe } = user as any;
    return { user: safe, accessToken: token };
  }
}


