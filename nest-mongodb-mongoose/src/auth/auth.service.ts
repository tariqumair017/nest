import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from 'src/user/schemas/user.schema';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(
        @InjectModel(User.name) private userModel: Model<UserDocument>,
        private readonly jwtService: JwtService,
    ) {}

    async signup(email: string, password: string, name: string) {
        const hashPassword = await bcrypt.hash(password, 10);
        const newUser = new this.userModel({ email, password: hashPassword, name });
        await newUser.save();
        return { _id: newUser._id, email: newUser.email, name: newUser.name };
    }

    async login(email: string, password: string) {
        const user = await this.userModel.findOne({ email });
        if(!user) return null;
        const isMatched = await bcrypt.compare(password, user.password);
        if(!isMatched) return null; 
        
        const payload = { sub: user._id, email: user.email };
        return {
            access_token: this.jwtService.sign(payload),
            user: { _id: user._id, email: user.email, name: user.name }
        }; 
    }
}
