import { UserEntity } from './User/user.entity';
import { Repository } from 'typeorm';
export declare class AppService {
    private readonly userRepository;
    constructor(userRepository: Repository<UserEntity>);
    getAll(): Promise<UserEntity[]>;
}
