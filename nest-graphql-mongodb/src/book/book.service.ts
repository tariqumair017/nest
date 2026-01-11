import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Book } from './model/book.model';
import { Model } from 'mongoose';
import { CreateBookInput } from './dto/create-book.input';
import { UpdateBookInput } from './dto/update-book.input';

@Injectable()
export class BookService {
    constructor(@InjectModel(Book.name) private readonly bookModel: Model<Book>) {}

    async create(data: CreateBookInput): Promise<Book> {
        const createdBook = new this.bookModel(data);
        return createdBook.save();
    }

    async findAll(): Promise<Book[]> {
        return this.bookModel.find().exec();
    }

    async findOne(id: string): Promise<Book> {
        let book = await this.bookModel.findById(id).exec();
        if (!book) {
            throw new NotFoundException('Book not found');
        }
        return book;
    }

    async update(input: UpdateBookInput): Promise<Book> {
        const updatedBook = await this.bookModel.findByIdAndUpdate(input.id, input, { new: true }).exec();
        if (!updatedBook) {
            throw new NotFoundException('Book not found');
        }   
        return updatedBook;
    }

    async remove(id: string): Promise<{message: string}> {
        const deletedBook = await this.bookModel.findByIdAndDelete(id).exec();
        if (!deletedBook) {
            throw new NotFoundException('Book not found');
        }
        return { message: 'Book deleted successfully' };
    }
}
