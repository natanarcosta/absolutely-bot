import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { firstValueFrom } from 'rxjs';
const pjson = require('../package.json');

@Injectable()
export class AppService {
  constructor(private http: HttpService) {}
  getHello(): string {
    return 'Hello World!' + ' v' + pjson.version;
  }

  @Cron(CronExpression.EVERY_10_MINUTES)
  async ping() {
    console.log('Pingando bot');
    await firstValueFrom(
      this.http.get('https://absolutely-bot.herokuapp.com/'),
    ).catch((e) => console.log('Erro ao pingar bot'));
  }
}
