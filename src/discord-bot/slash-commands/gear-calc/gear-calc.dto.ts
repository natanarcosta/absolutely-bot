import { Choice, Param, ParamType } from '@discord-nestjs/core';

export enum GearChoices {
  AKKAN_25 = '1650',
  AKKAN_24 = '1645',
  AKKAN_23 = '1640',
  AKKAN_22 = '1635',
  AKKAN_21 = '1630',
  AKKAN_20 = '1625',
  AKKAN_19 = '1620',
  AKKAN_18 = '1615',
  AKKAN_17 = '1610',
  AKKAN_16 = '1605',
  AKKAN_15 = '1600',
  AKKAN_14 = '1595',
  AKKAN_13 = '1590',
  BREL_25 = '1615',
  BREL_24 = '1610',
  BREL_23 = '1605',
  BREL_22 = '1600',
  BREL_21 = '1595',
  BREL_20 = '1590',
  BREL_19 = '1580',
  BREL_18 = '1570',
}

export class GearCalcCommandDto {
  @Choice(GearChoices)
  @Param({ description: 'Arma', required: true, type: ParamType.STRING })
  arma: string;

  @Choice(GearChoices)
  @Param({ description: 'Peitoral', required: true, type: ParamType.STRING })
  peito: string;

  @Choice(GearChoices)
  @Param({ description: 'Luvas', required: true, type: ParamType.STRING })
  luvas: string;

  @Choice(GearChoices)
  @Param({ description: 'Calças', required: true, type: ParamType.STRING })
  calça: string;

  @Choice(GearChoices)
  @Param({ description: 'Ombreiras', required: true, type: ParamType.STRING })
  ombro: string;

  @Choice(GearChoices)
  @Param({ description: 'Capacete', required: true, type: ParamType.STRING })
  capacete: string;
}
