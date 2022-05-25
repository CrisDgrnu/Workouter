import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { UserDto } from '../dtos/user.dto';
import { User } from '../models';
export declare class UserService {
    private readonly userRepository;
    constructor(userRepository: Repository<User>);
    create(user: UserDto): Promise<User>;
    findAll(): Promise<User[]>;
    find(id: number): Promise<User>;
    update(id: number, userDto: UserDto): Promise<UpdateResult>;
    remove(id: number): Promise<DeleteResult>;
}
