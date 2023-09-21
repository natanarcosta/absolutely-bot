import { SlashCommandPipe } from '@discord-nestjs/common';
import { Command, Handler, InteractionEvent } from '@discord-nestjs/core';
import { Injectable } from '@nestjs/common';
import { AtkPowerCalcDto } from './atk-power-calc.dto';
@Command({
  name: 'atk-power',
  description:
    'Calcula o atk power do personagem utilizando status base e status da arma.',
})
@Injectable()
export class AtkPowerCalcCommand {
  @Handler()
  onTax(@InteractionEvent(SlashCommandPipe) options: AtkPowerCalcDto) {
    const weaponPower = Number(options.arma);
    const baseStat = Number(options.base_status);

    const baseAtkPower = Math.floor(Math.sqrt((baseStat * weaponPower) / 6));

    let reply = `\`\`\`
    `;

    reply = reply.concat(`  Atk Power Base: ${baseAtkPower}
    `);
    reply = reply.concat(
      `  C/ Cursed Doll 3: ${Math.floor(baseAtkPower * 1.16)}
      `,
    );
    reply = reply.concat(
      `C/ Cursed Doll 1: ${Math.floor(baseAtkPower * 1.03)}
      `,
    );
    reply = reply.concat(
      `C/ Mass Increase 3: ${Math.floor(baseAtkPower * 1.18)}
      `,
    );

    reply = reply.concat('```');

    return reply;
  }
}
