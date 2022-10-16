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
          bestBidForParty / 3,
        )} para cada)
Para grupo de 8 pessoas: Bid de ${bestBidForRaid} | ( Lucro de ${Math.round(
          bestBidForParty / 7,
        )} para cada)
         \`\`\``,
      );
    }
  }
}
