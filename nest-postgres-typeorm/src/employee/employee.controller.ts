import { Body, Controller, Get, Post, Param, Put, Delete, Query, UseGuards } from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { Employee } from './employee.entity';
import { AuthGuard } from 'src/auth/auth/auth.guard';


@Controller('employee')
export class EmployeeController {
    constructor(private readonly employeeService: EmployeeService) {}

    @Post('create')
    async createEmployee(@Body() body: Partial<Employee>): Promise<Employee> {
        return await this.employeeService.createEmployee(body);
    }

    @UseGuards(AuthGuard)
    @Get('all')
    async allEmployee(): Promise<Employee[]> {
        return await this.employeeService.allEmployee();
    }

    @Get('search')
    async searchEmployee(@Query('name') name?: string, @Query('department') department?: string): Promise<Employee[]> { 
        return await this.employeeService.search({name, department});
    }

    @Get('single/:id')
    async singleEmployee(@Param('id') id: string): Promise<Employee | null> { 
        return await this.employeeService.singleEmployee(+id);
    }
 
    @Put('update/:id')
    async updateEmployee(@Param('id') id: number, @Body() body: Partial<Employee>): Promise<Employee | null> {
        return await this.employeeService.updateEmployee(id, body);
    }

    @Delete('delete/:id')
    async deleteEmployee(@Param('id') id: number): Promise<{ message: string }> { 
        return await this.employeeService.deleteEmployee(id);
    }
}