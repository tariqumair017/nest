import { Injectable } from '@nestjs/common'; 
import { InjectModel } from '@nestjs/mongoose';
import { Employee } from './schemas/employee.schema';
import { Model } from 'mongoose';
import { Profile } from './schemas/profile.schema';

@Injectable()
export class EmployeeService {

  constructor(
    @InjectModel(Employee.name) private employeeModel: Model<Employee>,
    @InjectModel(Profile.name) private profileModel: Model<Profile>
  ) {}

  async createEmployee(data): Promise<Employee> {
    const profile = await new this.profileModel({age: data.age, qualification: data.qualification}).save();
    const createdEmployee = new this.employeeModel({name: data.name, profile: profile._id});
    return createdEmployee.save();
  }

  async findAll(): Promise<Employee[]> {
    return await this.employeeModel.find().populate('profile').exec();
  }

  findOne(id: number) {
    return `This action returns a #${id} employee`;
  }

  update(id: number) {
    return `This action updates a #${id} employee`;
  }

  remove(id: number) {
    return `This action removes a #${id} employee`;
  }
}
