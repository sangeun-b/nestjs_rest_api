import { Acct } from 'src/acct/entity/acct.entity';
import { Imgs2 } from 'src/Imgs2/entity/imgs2.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('member')
export class Member {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToOne(() => Acct, (acct) => acct.members, { onDelete: 'CASCADE' })
  acct: Acct;

  @OneToMany(() => Imgs2, (imgs) => imgs.member)
  imgs: Imgs2[];
}
