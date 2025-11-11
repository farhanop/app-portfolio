import { SetMetadata } from '@nestjs/common';
import { UserRole } from '../../users/entities/user.entity';

export const ROLES_KEY = 'roles';
// Decorator ini menerima daftar role yang diizinkan (misal: ['superadmin', 'admin_bauk'])
export const Roles = (...roles: UserRole[]) => SetMetadata(ROLES_KEY, roles);
