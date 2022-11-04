import { InjectDiscordClient, On, Once } from '@discord-nestjs/core';
import { Injectable, Logger } from '@nestjs/common';
import { Client, Message } from 'discord.js';

@Injectable()
export class BotGateway {
  private readonly logger = new Logger(BotGateway.name);

  constructor(@InjectDiscordClient() private readonly client: Client) {}

  @Once('ready')
  onReady() {
    this.logger.log('Bot started: ' + this.client.user.tag);
  }

  @On('messageCreate')
  async onMessage(message: Message) {
    if (!process.env.WHITELIST_CHANNELS.includes(message.channelId)) return;

    if (message.content.startsWith('/bid')) {
      const content = message.content.split(' ');
      if (content.length !== 2) return;

      const bidValue = Number(content[1]);
      if (isNaN(bidValue)) return;
      if (bidValue <= 0) return;

      const valueAfterTax = bidValue - bidValue * 0.05;

      const bestBidForParty = Math.round((valueAfterTax / 4) * 3);

      const bestBidForRaid = Math.round((valueAfterTax / 8) * 7);

      await message.reply(
        `\`\`\`
Para grupo de 4 pessoas: Bid de ${bestBidForParty} | ( Lucro de ${Math.round(
          valueAfterTax / 4,
        )} para cada)
Para grupo de 8 pessoas: Bid de ${bestBidForRaid} | ( Lucro de ${Math.round(
          valueAfterTax / 8,
        )} para cada)
         \`\`\``,
      );
    }

    if (message.content.startsWith('/p2w')) {
      const content = message.content.split(' ');
      if (content.length !== 2) return;

      const crystalValue = Number(content[1]);
      if (isNaN(crystalValue)) return;
      if (crystalValue <= 0) return;

      const crystalNeeded = 238;

      const skinCrystalCosts = {
        tier1: {
          cost: 2000,
        },
        tier2: {
          cost: 2400,
        },
        tier3: {
          cost: 1950,
        },
        tier4: {
          cost: 650,
        },
      };

      const result: { tier: string; value: number }[] = [];

      Object.entries(skinCrystalCosts).forEach((entry) => {
        result.push({
          tier: entry[0].toString(),
          value:
            Math.floor(Number(entry[1].cost) / crystalNeeded) * crystalValue,
        });
      });

      let reply = `\`\`\`
          `;
      result.forEach((res) => {
        reply = reply.concat(
          `Skins de custo ${
            skinCrystalCosts[res.tier].cost
          } precisam ser vendidas por no mínimo ${res.value}
          `,
        );
      });

      reply = reply.concat('```');

      await message.reply(reply);
    }
  }
}
