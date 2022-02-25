import { Cam } from 'src/cam/entity/cam.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('visitor')
export class Visitor {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  img: string;

  @CreateDateColumn()
  visitDate: Date;

  @ManyToOne(() => Cam, (cam) => cam.visitors)
  cam: Cam;
}
