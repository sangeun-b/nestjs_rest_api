import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { getConnection } from 'typeorm';
import { VisitorDTO } from './dto/visitor.dto';
import { Visitor } from './entity/visitor.entity';
import { VisitorRepository } from './visitor.repository';

@Injectable()
export class VisitorService {
  constructor(
    @InjectRepository(VisitorRepository)
    private visitorRepo: VisitorRepository,
  ) {}

  async save(visitor: Visitor): Promise<Visitor | undefined> {
    return await this.visitorRepo.save(visitor);
  }

  async findByDate(
    visitDate: string,
    id: number,
  ): Promise<Visitor[] | undefined> {
    return await this.visitorRepo
      .createQueryBuilder('visitor')
      .select([
        'visitor.id',
        'visitor.name',
        'visitor.img',
        'visitor.visitDate',
      ])
      .where('visitor.visitDate = visitDate and visitor.cam = id', {
        visitDate,
        id,
      })
      .execute();
    //return await this.visitorRepo.findOne({ visitDate });
  }
}
