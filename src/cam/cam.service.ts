import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { getConnection } from 'typeorm';
import { CamRepository } from './cam.repository';
import { Cam } from './entity/cam.entity';

@Injectable()
export class CamService {
  constructor(
    @InjectRepository(CamRepository)
    private camRepository: CamRepository,
  ) {}

  async create(cam: Cam): Promise<Cam | undefined> {
    return await this.camRepository.save(cam);
  }

  findOne(id: number): Promise<Cam | undefined> {
    return this.camRepository.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.camRepository.delete(id);
  }

  async update(id: number, cam: Cam): Promise<void> {
    const existedCam = this.camRepository.findOne(id);
    if (existedCam) {
      await getConnection()
        .createQueryBuilder()
        .update(Cam)
        .set({
          macAddr: cam.macAddr,
        })
        .where('id = :id', { id })
        .execute();
    }
  }
}
