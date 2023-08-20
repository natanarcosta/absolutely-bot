import { InjectDiscordClient, On, Once } from '@discord-nestjs/core';
import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { Client, Message, TextChannel } from 'discord.js';

@Injectable()
export class BotGateway {
  private readonly logger = new Logger(BotGateway.name);

  constructor(@InjectDiscordClient() private readonly client: Client) {}

  getTextChannel(id: string): TextChannel {
    return this.client.channels.cache.get(id) as TextChannel;
  }

  @Cron('0 20 * * 2')
  sendWeeklyReminder(): void {
    const channelList: string[] = JSON.parse(
      process.env.WEEKLY_REMINDER_CHANNELS,
    );

    for (const id of channelList) {
      const channel = this.getTextChannel(id);

      const messageContent =
        '@everyone É terça-feira! Lembrem de finalizar contribuição da guild e limpar lojas de evento/guild/pvp!';

      if (channel)
        channel.send({
          content: messageContent,
          allowedMentions: { parse: ['everyone'] },
        });
    }
  }

  @Cron(CronExpression.EVERY_DAY_AT_7AM)
  async purgeChannels() {
    const channelList: string[] = JSON.parse(process.env.PURGE_CHANNELS);

    for (const id of channelList) {
      const channel = this.getTextChannel(id);

      if (channel) {
        const messages = await channel.messages.fetch();

        channel
          .bulkDelete(messages, true)
          .then(() => console.log('Mensagens deletadas com sucesso.'));
      }
    }
  }

  @Once('ready')
  onReady() {
    this.logger.log('Bot started: ' + this.client.user.tag);
  }

  @On('messageCreate')
  async onMessage(message: Message) {
    if (!process.env.WHITELIST_CHANNELS.includes(message.channelId)) return;

    if (message.content.startsWith('/comandos')) {
      message.reply(`
      \`\`\`
      /bid {valor do item no mercado} - Calcula o lance para dividir o gold igualmente entre os membros do grupo.
      /p2w {valor do gold no F4} - Calcula o valor pelo qual skins devem ser vendidas para valerem mais que o gold do F4.
      /tax {valor} - Calcula o valor a ser pago de um empréstimo, levando em conta a taxa de 5%.

      ex: /bid 10000
      \`\`\``);
    }

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
            (Number(entry[1].cost) / crystalNeeded) * crystalValue,
          ),
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

    if (message.content.startsWith('/tax')) {
      const content = message.content.split(' ');
      if (content.length !== 2) return;

      const value = Number(content[1]);

      const ansa = Math.ceil(value / 0.95);

      message.reply(
        `\`\`\`O valor a ser pago para o recipiente ter ${value.toLocaleString()} depois da taxa (5%) é: ${ansa.toLocaleString()}\`\`\``,
      );
    }
  }
}
