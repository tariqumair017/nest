import { Body, Controller, Post } from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { Employee } from './employee.entity';

@Controller('employee')
export class EmployeeController {
    constructor(private readonly employeeService: EmployeeService) {}

    @Post()
    async createEmployee(@Body() body: Partial<Employee>): Promise<Employee> {
        return await this.employeeService.createEmployee(body);
    }
}