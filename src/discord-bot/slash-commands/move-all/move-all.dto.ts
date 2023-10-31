import { Channel, Param, ParamType } from '@discord-nestjs/core';

export class MoveAllCommandDto {
  @Param({ description: 'ID Canal', required: true, type: ParamType.STRING })
  channel_id: string;
}
