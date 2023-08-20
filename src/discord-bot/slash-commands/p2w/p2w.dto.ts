import { Param, ParamType } from '@discord-nestjs/core';

export class P2WCommandDto {
  @Param({
    description: 'Valor do gold no F4',
    required: true,
    type: ParamType.NUMBER,
  })
  gold: number;

  @Param({
    description: 'Preço da skin em cristais coloridos',
    required: false,
    type: ParamType.NUMBER,
  })
  crystal: number;
}
