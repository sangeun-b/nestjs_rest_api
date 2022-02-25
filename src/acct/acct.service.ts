import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOneOptions, getConnection } from 'typeorm';
import { AcctRepository } from './acct.repository';
import { AcctDTO } from './dto/acct.dto';
import * as bcrypt from 'bcrypt';
import { Acct } from './entity/acct.entity';

@Injectable()
export class AcctService {
  constructor(
    @InjectRepository(AcctRepository)
    private acctRepository: AcctRepository,
  ) {}

  async findByFields(
    options: FindOneOptions<AcctDTO>,
  ): Promise<Acct | undefined> {
    return await this.acctRepository.findOne(options);
  }

  async save(acctDTO: AcctDTO): Promise<AcctDTO | undefined> {
    await this.transformPassword(acctDTO);
    console.log(acctDTO);
    return await this.acctRepository.save(acctDTO);
  }

  async transformPassword(acct: AcctDTO): Promise<void> {
    acct.pwd = await bcrypt.hash(acct.pwd, 10);
    return Promise.resolve();
  }
  findAll(): Promise<Acct[]> {
    return this.acctRepository.find();
  }

  findOne(id: number): Promise<Acct> {
    return this.acctRepository.findOne(id);
  }

  // async create(acct: Acct): Promise<void> {
  //   await this.acctRepository.save(acct); //async: 처리가 완료된 다음에 return
  // }

  async remove(id: number): Promise<void> {
    await this.acctRepository.delete(id);
  }

  async update(id: number, acct: Acct): Promise<void> {
    const existedAcct = await this.findOne(id);
    if (existedAcct) {
      await getConnection()
        .createQueryBuilder()
        .update(Acct)
        .set({
          pwd: acct.pwd,
          phone: acct.phone,
        })
        .where('id = :id', { id })
        .execute();
    }
  }
}
