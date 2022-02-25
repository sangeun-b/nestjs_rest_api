import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Observable } from 'rxjs';
import { AcctService } from 'src/acct/acct.service';
import { FindManyOptions, FindOneOptions, getConnection } from 'typeorm';
import { MemberDTO } from './dto/member.dto';
import { Member } from './entity/member.entity';
import { MemberRepository } from './member.repository';

@Injectable()
export class MemberService {
  constructor(
    @InjectRepository(MemberRepository)
    private memberRepository: MemberRepository,
    private acctService: AcctService,
  ) {}

  async findByFields(
    options: FindManyOptions<Member>,
  ): Promise<Member | undefined> {
    return await this.memberRepository.findOne(options);
  }

  async save(newMember: Member): Promise<Member | undefined> {
    const memberFind: MemberDTO = await this.findByFields({
      where: { name: newMember.name, acct: newMember.acct },
    });
    if (memberFind) {
      throw new HttpException(
        '이미 존재하는 이름입니다. 다른 이름을 사용해주세요',
        HttpStatus.BAD_REQUEST,
      );
    }
    return await this.memberRepository.save(newMember);
  }

  async findByName(name: string): Promise<Member | undefined> {
    // const findAcct = this.acctService.findOne(id);
    // if (!findAcct) {
    //   throw new HttpException('로그인 먼저 해주세요', HttpStatus.BAD_REQUEST);
    // }
    return await this.memberRepository.findOne(name);
  }
  findAll(): Promise<Member[]> {
    return this.memberRepository.find();
  }
  findOne(id: number): Promise<Member> {
    return this.memberRepository.findOne(id);
  }
  async remove(id: number): Promise<void> {
    await this.memberRepository.delete(id);
  }
  async update(id: number, member: Member): Promise<void> {
    const existedMember = await this.findOne(id);
    if (existedMember) {
      await getConnection()
        .createQueryBuilder()
        .update(Member)
        .set({
          name: member.name,
        })
        .where('id = :id', { id })
        .execute();
    }
  }
}
