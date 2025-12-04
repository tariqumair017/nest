import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe, UseGuards } from '@nestjs/common';
import { UserService } from './user.service'; 
import { CreateUserDto, UpdateUserDto } from './dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { Roles } from '../auth/roles.decorator';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Role } from '@prisma/client'; 
import { SelfOrAdminGuard } from '../auth/guards/self-or-admin.guard';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
 
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @Get('all')
  findAll() {
    return this.userService.findAll();
  }

  @UseGuards(JwtAuthGuard, SelfOrAdminGuard)
  @Get('single/:id')
  findOne(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.userService.findOne(id);
  }

  @UseGuards(JwtAuthGuard, SelfOrAdminGuard)
  @Patch('update/:id')
  update(@Param('id', new ParseUUIDPipe()) id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(id, updateUserDto);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @Delete('remove/:id')
  async remove(@Param('id', new ParseUUIDPipe()) id: string) {
    await this.userService.remove(id);
    return { message: 'User deleted successfully' };
  }
}
