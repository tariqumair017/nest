import { Injectable, BadRequestException, NotFoundException, ForbiddenException } from '@nestjs/common';
import { CreateWatchDto, UpdateWatchDto } from './dto'; 
import { PrismaService } from 'src/prisma/prisma.service';
import { Role } from '@prisma/client';
import { Watch } from './interface/watch.interface';

@Injectable()
export class WatchService {
  private watch: Watch[] = [];
  constructor(private readonly prisma: PrismaService) {}

  async create(userId: string, createData: CreateWatchDto): Promise<Watch> { 
    let watchExist = await this.prisma.watch.findFirst({
      where: {name: createData.name}
    });

    if(watchExist){
      throw new BadRequestException(`Watch with same name already exist`);
    }

    const newWtch = await this.prisma.watch.create({
      data: {
        ...createData,
        userId
      },
    }); 
    return newWtch;
  }
 
  async findAll(user: any): Promise<Watch[]> {
    if(user.role === 'ADMIN'){
      return this.prisma.watch.findMany();
    }
    return this.prisma.watch.findMany({
      where: { userId: user.userId }
    });
  }

  async findOne(user: any, id: string): Promise<Watch> {
    let watch: any;
    if(user.role === 'ADMIN'){
      watch = await this.prisma.watch.findUnique({
        where: { id }
      });
    } else {
      watch = await this.prisma.watch.findUnique({
        where: { id, userId: user.userId }
      });
    }
 
    if (!watch) {
      throw new NotFoundException(`Watch not found`);
    }

    return watch;
  }

  async update(user: any, id: string, watchData: UpdateWatchDto) {
    try {
      const watch = await this.prisma.watch.findUnique({ where: { id } });
      if (!watch) {
        throw new NotFoundException('Watch not found');
      }

      if (user.role !== Role.ADMIN && watch.userId !== user.userId) {
        throw new ForbiddenException('You can only update your own watches');
      }
      
      if (watchData.name) {
        const conflict = await this.prisma.watch.findFirst({
          where: { 
            name: watchData.name, 
            NOT: { id },
          },
          select: { id: true },
        });
        if (conflict) {
          throw new BadRequestException('Name already in use');
        }
      } 

      return await this.prisma.watch.update({
        where: { id },
        data: watchData
      });
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async remove(user: any, id: string) {
    try {
      const watch = await this.prisma.watch.findUnique({ where: { id } });
      if (!watch) {
        throw new NotFoundException('Watch not found');
      }

      if (user.role !== Role.ADMIN && watch.userId !== user.userId) {
        throw new ForbiddenException('You can only delete your own watch');
      }

      await this.prisma.watch.delete({
        where: { id }
      }); 
      return {success: true, message: 'Watch deleted success'};
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}
