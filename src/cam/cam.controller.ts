import { Body, Controller, Post } from '@nestjs/common';
import { CamService } from './cam.service';
import { Cam } from './entity/cam.entity';

@Controller('cam')
export class CamController {
  constructor(private camService: CamService) {}

  @Post()
  save(@Body() cam: Cam) {
    return this.camService.create(cam);
  }
}
