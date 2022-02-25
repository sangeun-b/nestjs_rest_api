import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { AuthService } from './auth.service';
import { AcctDTO } from '../acct/dto/acct.dto';
import { AuthGuard } from './security/auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/register')
  async registerAccount(
    @Req() req: Request,
    @Body() acctDTO: AcctDTO,
  ): Promise<any> {
    return await this.authService.registerAcct(acctDTO);
  }

  @Post('/login')
  async login(@Body() acctDTO: AcctDTO, @Res() res: Response): Promise<any> {
    const jwt = await this.authService.validateAcct(acctDTO);
    res.setHeader('Authorization', 'Bearer ' + jwt.accessToken);
    return res.json(jwt);
  }

  @Get('/authenticate')
  @UseGuards(AuthGuard) //사용자 정보 가지고옴
  isAuthenticated(@Req() req: Request): any {
    const acct: any = req.user;
    return acct;
  }
}
