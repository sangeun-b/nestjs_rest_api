import { Body, Controller, Param, Post, Put } from '@nestjs/common';
import { CamService } from 'src/cam/cam.service';
import { VisitorDTO } from './dto/visitor.dto';
import { Visitor } from './entity/visitor.entity';
import { VisitorService } from './visitor.service';

@Controller('cam')
export class VisitorController {
  constructor(
    private visitorService: VisitorService,
    private camService: CamService,
  ) {}

  @Post(':id/visitor')
  async saveVisitor(
    @Param('id') id: number,
    @Body() visitor: Visitor,
  ): Promise<Visitor | undefined> {
    console.log(visitor);
    const cam = await this.camService.findOne(id);
    visitor.cam = cam;
    return await this.visitorService.save(visitor);
  }

  @Put(':id/visitor')
  async findByDate(
    @Param('id') id: number,
    @Body() visitDate: string,
  ): Promise<Visitor[] | undefined> {
    return await this.visitorService.findByDate(visitDate, id);
  }
}
