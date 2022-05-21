import { DeleteResult, UpdateResult } from 'typeorm';
import { UserDto } from '../dto';
import { UpdateUserDto } from '../dto/updateUser.dto';
import { User } from '../models';
import { UserService } from '../services/user.service';
export declare class UserController {
    private userService;
    constructor(userService: UserService);
    create(userDto: UserDto): Promise<User>;
    findAll(): Promise<User[]>;
    findOne(id: number): Promise<User>;
    update(id: number, updateUserDto: UpdateUserDto): Promise<UpdateResult>;
    remove(id: number): Promise<DeleteResult>;
}
