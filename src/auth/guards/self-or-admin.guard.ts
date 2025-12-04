import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Role } from '@prisma/client';

@Injectable()
export class SelfOrAdminGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const user = request.user as { userId: string; role: Role } | undefined;
    if (!user) return false;
    const paramId = request.params?.id as string | undefined;
    if (!paramId) return false;
    return user.role === 'ADMIN' || user.userId === paramId;
  }
}


