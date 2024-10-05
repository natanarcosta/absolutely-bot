import { Module } from '@nestjs/common';
import { ValorantChatBotController } from './valorant-chat-bot.controller';
import { ValorantChatBotService } from './valorant-chat-bot.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  controllers: [ValorantChatBotController],
  providers: [ValorantChatBotService],
  imports: [HttpModule]
})
export class ValorantChatBotModule {}
