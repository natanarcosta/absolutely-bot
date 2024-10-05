import { Controller, Get } from '@nestjs/common';
import { ValorantChatBotService } from './valorant-chat-bot.service';

@Controller('vava')
export class ValorantChatBotController {
  constructor(private readonly service: ValorantChatBotService) {}

  @Get('/status')
  currentRankAndMmr() {
    console.log('Bateu aqui');
    return this.service.getStatus();
  }
}
