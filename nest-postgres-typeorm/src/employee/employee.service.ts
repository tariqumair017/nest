import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Employee } from './employee.entity';
import { Repository } from 'typeorm';

@Injectable()
export class EmployeeService {
    constructor(
        @InjectRepository(Employee)
        private employeeRepository: Repository<Employee>,
    ) {}

    async createEmployee(data: Partial<Employee>): Promise<Employee> {
        const employee = this.employeeRepository.create(data);
        return await this.employeeRepository.save(employee);
    }
}