import { Injectable, NotFoundException, Body } from '@nestjs/common';
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

    async allEmployee(): Promise<Employee[]> {
        const employees = await this.employeeRepository.find();
        return employees;
    }

    async singleEmployee(id: number): Promise<Employee | null> {
        const employee = await this.employeeRepository.findOneBy({ id });
        if (!employee) {
            throw new NotFoundException(`Employee not found`);
        }
        return employee;
    }

    async updateEmployee(id: number, data: Partial<Employee>): Promise<Employee | null> {
        const employee = await this.employeeRepository.findOneBy({ id });
        if (!employee) {
            throw new NotFoundException(`Employee not found`);
        }
        
        const update = Object.assign(employee, data); 
        return await this.employeeRepository.save(update);   
    }

    async deleteEmployee(id: number): Promise<{ message: string }> { 
        let result = await this.employeeRepository.delete(id);
        if(result.affected === 0) {
            throw new NotFoundException(`Employee not found`);
        }
        return {message: "Deleted Success"};
    }

    async search(filters: {name?: string, department?: string}): Promise<Employee[]> {
        let query = this.employeeRepository.createQueryBuilder('employee');
        
        if(filters.name){
            query.andWhere('employee.name ILIKE :name', {name: `%${filters.name}%`});
        }

        if(filters.department){
            query.andWhere('employee.department = :department', {department: filters.department});
        }
        return await query.getMany(); 
    }
}