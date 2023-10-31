import { Module } from '@nestjs/common';
import { P2WCommand } from './p2w/p2w.command';
import { ReflectMetadataProvider } from '@discord-nestjs/core';
import { GearCalcCommand } from './gear-calc/gear-calc.command';
import { ShardsCalcCommand } from './shards/shards.command';
import { AtkPowerCalcCommand } from './atk-power-calc/atk-power-calc.command';
import { MoveAllCommand } from './move-all/move-all.command';

@Module({
  providers: [
    P2WCommand,
    GearCalcCommand,
    ShardsCalcCommand,
    ReflectMetadataProvider,
    AtkPowerCalcCommand,
    MoveAllCommand,
  ],
  imports: [],
})
export class BotSlashCommandsModule {}
