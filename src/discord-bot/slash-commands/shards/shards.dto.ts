import { Param, ParamType } from '@discord-nestjs/core';

export class ShardsCommandDto {
  @Param({
    description: 'Preço do cristal azul no F4',
    required: true,
    type: ParamType.NUMBER,
  })
  blue_crystal_value: number;
}
