import { SlashCommandPipe } from '@discord-nestjs/common';
import { Command, Handler, InteractionEvent } from '@discord-nestjs/core';
import { Injectable } from '@nestjs/common';
import { GearCalcCommandDto, GearChoices } from './gear-calc.dto';

@Command({
  name: 'gear-calc',
  description: 'Informa o ilvl das peças de gear informadas',
})
@Injectable()
export class GearCalcCommand {
  findGearLabel(ilvl: string) {
    let label = Object.keys(GearChoices).find((k) => GearChoices[k] === ilvl);

    return label;
  }

  @Handler()
  onTax(@InteractionEvent(SlashCommandPipe) options: GearCalcCommandDto) {
    let totalGearScore = 0;

    Object.keys(options).forEach((key) => {
      totalGearScore += Number(options[key]);
    });

    const actualGearScore = totalGearScore / 6;

    let reply = `\`\`\`
    `;

    reply = reply.concat(`ILVL: ${actualGearScore.toString().substring(0, 7)}
    `);

    const arma = this.findGearLabel(options.arma);

    const peito = this.findGearLabel(options.peito);

    const luvas = this.findGearLabel(options.luvas);

    const ombro = this.findGearLabel(options.ombro);

    const capacete = this.findGearLabel(options.capacete);

    const calca = this.findGearLabel(options.calça);

    reply = reply.concat(
      `Arma: ${arma} (${options.arma})| Peito: ${peito} (${options.peito}) | Luvas: ${luvas} (${options.luvas})
    Ombro: ${ombro} (${options.ombro}) | Capacete: ${capacete} (${options.capacete}) | Calça: ${calca} (${options.calça})
      `,
    );

    reply = reply.concat('```');

    return reply;
  }
}
