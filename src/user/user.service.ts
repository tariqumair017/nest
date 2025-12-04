import { BadRequestException, Injectable } from '@nestjs/common';   
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto, UpdateUserDto } from './dto';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}
  
  async findAll() {
    return this.prisma.user.findMany({
      select: {
        id: true,
        email: true,
        phone: true,
        name: true,
        age: true,
        createdAt: true,
        updatedAt: true,
      }
    });
  }

  async findOne(id: string) {
    return this.prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        email: true,
        phone: true,
        name: true,
        age: true,
        createdAt: true,
        updatedAt: true,
      }
    });
  }

  async update(id: string, data: UpdateUserDto) {
    try {
      const user = await this.findOne(id);
      if (!user) {
        throw new BadRequestException('User not found');
      }
      // prevent unique conflicts when updating email/phone to already-used values
      if (data.email || data.phone) {
        const conflict = await this.prisma.user.findFirst({
          where: {
            AND: [
              { id: { not: id } },
              {
                OR: [
                  data.email ? { email: data.email } : undefined,
                  data.phone ? { phone: data.phone } : undefined,
                ].filter(Boolean) as any,
              },
            ],
          },
          select: { id: true },
        });
        if (conflict) {
          throw new BadRequestException('Email or phone already in use');
        }
      }
      const { email, phone, name, age } = data;
      return this.prisma.user.update({
        where: { id },
        data: { email, phone, name, age },
        select: {
          id: true,
          email: true,
          phone: true,
          name: true,
          age: true,
          createdAt: true,
          updatedAt: true,
        }
      });
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async remove(id: string) {
    try {
      const user = await this.findOne(id);
      if (!user) {
        throw new BadRequestException('User not found');
      }
      await this.prisma.user.delete({
        where: { id }
      });
      return;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

}
