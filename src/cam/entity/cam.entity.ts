import { Visitor } from 'src/visitor/entity/visitor.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('cam')
export class Cam {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  macAddr: string;

  @OneToMany(() => Visitor, (visitor) => visitor.cam)
  visitors: Visitor[];
}
