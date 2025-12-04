import { Injectable, NestMiddleware } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class JwtAuthMiddleware implements NestMiddleware {
  constructor(private readonly jwtService: JwtService) {}

  async use(req: Request, _res: Response, next: NextFunction) {
    const auth = req.headers['authorization'];
    if (auth && auth.startsWith('Bearer ')) {
      const token = auth.substring('Bearer '.length);
      try {
        const payload = await this.jwtService.verifyAsync(token);
        (req as any).user = { userId: payload.sub, email: payload.email, role: payload.role };
      } catch {}
    }
    next();
  }
}


