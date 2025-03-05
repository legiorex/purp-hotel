import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLE_KEY } from '../decorators/roles.decorator';
import { Role } from '../enams/role.enam';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<Role>(ROLE_KEY, [context.getHandler(), context.getClass()]);
    if (!requiredRoles) {
      return true;
    }

    const request = context.switchToHttp().getRequest();

    if (!request.user) {
      return true;
    }

    return request.user.role === requiredRoles;
  }
}
