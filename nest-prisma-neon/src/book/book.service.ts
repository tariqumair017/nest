import { as } from './../../node_modules/effect/src/Cause';
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateBookInput } from './dto/create-book.input';
import { UpdateBookInput } from './dto/update-book.input';

@Injectable()
export class BookService {

    constructor(private prisma: PrismaService) {}

    async create(data: CreateBookInput){
        return await this.prisma.book.create({ data: data });
    }


    async findAll(){
        return await this.prisma.book.findMany();
    }

    async findOne(id: string){
        return await this.prisma.book.findUnique({ where: { id } });
    }

    async update(data: UpdateBookInput){
        return await this.prisma.book.update({ 
            where: { id: data.id }, 
            data: { title: data.title, author: data.author } 
        });
    }

    async remove(id: string){
        return await this.prisma.book.delete({ where: { id } });
    }
}
