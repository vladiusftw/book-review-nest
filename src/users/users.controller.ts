import { Controller, Post, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { JWTAuthGuard } from 'src/auth/jwt/jwt.guard';
import { PermissionsGuard } from 'src/auth/permissions/permissions.guard';

@Controller('users')
@UseGuards(JWTAuthGuard, PermissionsGuard)
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post()
  createUser() {}
}
