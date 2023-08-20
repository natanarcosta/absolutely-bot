import { Module } from '@nestjs/common';
import { P2WCommand } from './p2w/p2w.command';
import { ReflectMetadataProvider } from '@discord-nestjs/core';

@Module({
  providers: [P2WCommand, ReflectMetadataProvider],
  imports: [],
})
export class BotSlashCommandsModule {}
