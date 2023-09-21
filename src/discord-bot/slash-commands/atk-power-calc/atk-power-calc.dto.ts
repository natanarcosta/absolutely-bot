import { Choice, Param, ParamType } from '@discord-nestjs/core';

export enum WeaponChoices {
  AKKAN_25 = '74811',
  AKKAN_24 = '72384',
  AKKAN_23 = '70036',
  AKKAN_22 = '67764',
  AKKAN_21 = '65566',
  AKKAN_20 = '63439',
  AKKAN_19 = '61381',
  AKKAN_18 = '59390',
  AKKAN_17 = '57463',
  AKKAN_16 = '55599',
  AKKAN_15 = '53796',
  AKKAN_14 = '52051',
  AKKAN_13 = '50362',
  BREL_25 = '59390',
  BREL_24 = '57463',
  BREL_23 = '55599',
  BREL_22 = '53796',
  BREL_21 = '52051',
  BREL_20 = '50362',
  BREL_19 = '48194',
  BREL_18 = '46118',
}

export class AtkPowerCalcDto {
  @Choice(WeaponChoices)
  @Param({ description: 'Arma', required: true, type: ParamType.STRING })
  arma: string;

  @Param({
    description: 'Status Base (Strength/Dexterity/Intelligence',
    required: true,
    type: ParamType.STRING,
  })
  base_status: string;
}
