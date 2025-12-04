import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, ParseUUIDPipe, Request } from '@nestjs/common';
import { WatchService } from './watch.service';
import { CreateWatchDto, UpdateWatchDto } from './dto'; 
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/auth/roles.decorator';
import { Role } from '@prisma/client';

@Controller('watch')
@UseGuards(JwtAuthGuard, RolesGuard)
// @Roles(Role.USER)
export class WatchController {
  constructor(private readonly watchService: WatchService) {}
  
  @Post('create')
  create(@Request() req, @Body() createWatchDto: CreateWatchDto) { 
    return this.watchService.create(req.user.userId, createWatchDto);
  }

  @Get('all')
  findAll(@Request() req) {
    return this.watchService.findAll(req.user);
  }

  @Get('single/:id')
  findOne(@Request() req, @Param('id') id: string) {
    return this.watchService.findOne(req.user, id);
  }

  @Patch('update/:id')
  update(@Request() req, @Param('id') id: string, @Body() updateWatchDto: UpdateWatchDto) {
    return this.watchService.update(req.user, id, updateWatchDto);
  }

  @Delete('remove/:id')
  remove(@Request() req, @Param('id') id: string) {
    return this.watchService.remove(req.user, id);
  }
}
