import { Query, Resolver, Mutation, Args } from '@nestjs/graphql';
import { BookService } from '../book.service';
import { Book } from '../model/book.model';
import { CreateBookInput } from '../dto/create-book.input';
import { UpdateBookInput } from '../dto/update-book.input';

@Resolver(() => Book)
export class BookResolver {
    constructor(private readonly bookService: BookService) {}

    @Query(() => [Book], { name: 'allBooks' })
    async findAll() {
        return this.bookService.findAll();
    }

    @Query(() => Book, { name: 'book' })
    async findOne(@Args('id', {type: () => String}) id: string) {
        return this.bookService.findOne(id);
    }

    @Mutation(() => Book)
    async createBook(@Args('input') input: CreateBookInput) {
        return this.bookService.create(input);
    }

    @Mutation(() => Book)
    async updateBook(@Args('input') input: UpdateBookInput) {
        return this.bookService.update(input);
    }

    @Mutation(() => Book)
    async removeBook(@Args('id', {type: () => String}) id: string) {
        return this.bookService.remove(id);
    }
}
