import { Body, Controller, Delete, Get, Param, Patch, Post, Put } from '@nestjs/common';
import { StudentService } from './student.service';
import { Student } from './student.schema';

@Controller('student')
export class StudentController {
    constructor(private readonly studentService: StudentService) {}

    @Post('create')
    async createStudent(@Body() data: Partial<Student>) {
        return this.studentService.createStudent(data);
    }

    @Get('all')
    async getAllStudents() {
        return this.studentService.getAllStudents();
    }

    @Get('single/:id')
    async getStudentById(@Param('id') id: string) {
        return this.studentService.getStudentById(id);
    }

    @Put('update/:id')
    async updateStudent(@Param('id') id: string, @Body() data: Partial<Student>) {
        return this.studentService.updateStudent(id, data);
    }

    @Patch('patch-update/:id')
    async patchUpdateStudent(@Param('id') id: string, @Body() data: Partial<Student>) {
        return this.studentService.patchUpdateStudent(id, data);
    }

    @Delete('delete/:id')
    async deleteStudent(@Param('id') id: string) {
        return this.studentService.deleteStudent(id);
    }
}
