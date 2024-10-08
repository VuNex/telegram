import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'User' })
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  tg_id: number;

  @Column()
  name: string;

  @Column()
  uin: string;
}
