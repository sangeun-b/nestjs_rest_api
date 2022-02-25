import { Member } from 'src/member/entity/member.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('imgs')
export class Imgs2 {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @CreateDateColumn()
  uploadDate: Date;

  @ManyToOne(() => Member, (member) => member.imgs, { onDelete: 'CASCADE' })
  member: Member;
}
