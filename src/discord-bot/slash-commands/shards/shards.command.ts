import { SlashCommandPipe } from '@discord-nestjs/common';
import { Command, Handler, InteractionEvent } from '@discord-nestjs/core';
import { Injectable } from '@nestjs/common';
import { ShardsCommandDto } from './shards.dto';

interface ShardBag {
  quantity: number;
  price: number;
}

@Command({
  name: 'shards',
  description: 'Calcula preço das Honor Shards',
})
@Injectable()
export class ShardsCalcCommand {
  getEachBagPrice(bag: ShardBag) {
    return bag.price / bag.quantity;
  }

  @Handler()
  onTax(@InteractionEvent(SlashCommandPipe) options: ShardsCommandDto) {
    const { blue_crystal_value } = options;

    const each_crystal_value = blue_crystal_value / 95;

    const smallShardBag: ShardBag = { quantity: 20, price: 112 };
    const mediumShardBag: ShardBag = { quantity: 20, price: 224 };
    const largeShardBag: ShardBag = { quantity: 20, price: 291 };

    const eachSmallBag =
      this.getEachBagPrice(smallShardBag) * each_crystal_value;

    const eachMediumBag =
      this.getEachBagPrice(mediumShardBag) * each_crystal_value;

    const eachLargeBag =
      this.getEachBagPrice(largeShardBag) * each_crystal_value;

    let reply = `\`\`\`
      `;

    reply =
      reply.concat(`Comprando cristal azul a ${blue_crystal_value} o custo de cada honor shard bag na Mari's Shop é: 
        (S): ${eachSmallBag.toFixed(2)}
        (M): ${eachMediumBag.toFixed(2)}
        (L): ${eachLargeBag.toFixed(2)}
        ------------------------------------------------
        (${blue_crystal_value} / 95) * (preço_mari / 20)
    `);

    reply = reply.concat('```');

    return reply;
  }
}
