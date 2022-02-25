import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Member } from 'src/member/entity/member.entity';
import { MemberService } from 'src/member/member.service';
import { Imgs2 } from './entity/imgs2.entity';
import { ImgsRepository } from './imgs2.repository';

@Injectable()
export class ImgsService {
  constructor(
    @InjectRepository(ImgsRepository)
    private imgsRepository: ImgsRepository,
  ) {}

  async save(img: Imgs2, mem: Member): Promise<Imgs2 | undefined> {
    img.member = mem;
    console.log(this.imgsRepository);
    return await this.imgsRepository.save(img);
  }

  async remove(id: number): Promise<void> {
    await this.imgsRepository.delete(id);
  }
}
