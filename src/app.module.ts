/* eslint-disable @typescript-eslint/no-unused-vars */
import { DiscordModule } from '@discord-nestjs/core';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GatewayIntentBits } from 'discord.js';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BotGateway } from './discord-bot/discord-bot.gateway';
import { DiscordBotModule } from './discord-bot/discord-bot.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    DiscordModule.forRootAsync({
      useFactory: () => ({
        token: process.env.TOKEN,
        discordClientOptions: {
          intents: [
            GatewayIntentBits.Guilds,
            GatewayIntentBits.MessageContent,
            GatewayIntentBits.GuildMessages,
            GatewayIntentBits.GuildMembers,
          ],
        },
      }),
    }),
    DiscordBotModule,
  ],
  controllers: [AppController],
  providers: [AppService, BotGateway],
})
export class AppModule {}
