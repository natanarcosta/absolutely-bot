import { SlashCommandPipe } from '@discord-nestjs/common';
import { Command, Handler, InteractionEvent } from '@discord-nestjs/core';
import { Injectable } from '@nestjs/common';
import { P2WCommandDto } from './p2w.dto';

@Command({
  name: 'p2w',
  description: 'Calcula o valor de mercado das skins do jogo.',
})
@Injectable()
export class P2WCommand {
  @Handler()
  onTax(@InteractionEvent(SlashCommandPipe) options: P2WCommandDto): string {
    const goldValue = options.gold;
    if (isNaN(goldValue)) return;
    if (goldValue <= 0) return;

    const crystalNeeded = 238;

    let reply = `\`\`\`
    `;

    if (!options.crystal) {
      const skinCrystalCosts = {
        tier1: {
          cost: 2000,
        },
        tier2: {
          cost: 2400,
        },
        tier3: {
          cost: 750,
        },
        tier4: {
          cost: 650,
        },
      };

      const result: { tier: string; value: number }[] = [];

      Object.entries(skinCrystalCosts).forEach((entry) => {
        result.push({
          tier: entry[0].toString(),
          value: Math.floor(
            (Number(entry[1].cost) / crystalNeeded) * goldValue,
          ),
        });
      });

      result.forEach((res) => {
        reply = reply.concat(
          `Skins de custo ${
            skinCrystalCosts[res.tier].cost
          } precisam ser vendidas por no mínimo ${res.value}
              `,
        );
      });

      reply = reply.concat('```');

      return reply;
    }

    let result = Math.floor(options.crystal / crystalNeeded * goldValue);
    reply = reply.concat(
      `A skin deve ser vendida por no mínimo ${result} gold`,
    );

    reply = reply.concat('```');

    return reply;
  }
}
