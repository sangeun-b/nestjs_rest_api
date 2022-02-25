import { Member } from 'src/member/entity/member.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('acct')
export class Acct {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  acct_id: string;

  @Column()
  pwd: string;

  @Column()
  phone: string;

  @Column()
  addr: string;

  @OneToMany(() => Member, (member) => member.acct)
  members: Member[];
}
