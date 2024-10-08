import { Repository } from 'typeorm';
import { UserEntity } from './user.entity';
export declare class UserService {
    private userRepository;
    constructor(userRepository: Repository<UserEntity>);
    create(user: UserEntity): Promise<UserEntity>;
    findAll(): Promise<UserEntity[]>;
    getByTgId(tg_id: number): Promise<UserEntity>;
}
