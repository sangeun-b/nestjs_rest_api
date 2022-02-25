import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CamRepository } from 'src/cam/cam.repository';
import { CamService } from 'src/cam/cam.service';
import { VisitorController } from './visitor.controller';
import { VisitorRepository } from './visitor.repository';
import { VisitorService } from './visitor.service';

@Module({
  imports: [TypeOrmModule.forFeature([VisitorRepository, CamRepository])],
  exports: [TypeOrmModule],
  controllers: [VisitorController],
  providers: [VisitorService, CamService],
})
export class VisitorModule {}
