import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from '../decorators/roles.decorator';
import { UserRole } from '../../users/entities/user.entity';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    // 1. Ambil role yang dibutuhkan dari decorator @Roles()
    const requiredRoles = this.reflector.getAllAndOverride<UserRole[]>(
      ROLES_KEY,
      [context.getHandler(), context.getClass()],
    );

    // 2. Kalau tidak ada decorator @Roles, berarti endpoint ini bebas akses (selama sudah login)
    if (!requiredRoles) {
      return true;
    }

    // 3. Ambil user dari request (yang sudah ditempel oleh JwtStrategy)
    const { user } = context.switchToHttp().getRequest();

    // 4. Cek apakah role user ada di daftar requiredRoles
    const hasRole = requiredRoles.some((role) => user.role === role);
    if (!hasRole) {
      throw new ForbiddenException('Anda tidak punya akses untuk fitur ini!');
    }
    return true;
  }
}
