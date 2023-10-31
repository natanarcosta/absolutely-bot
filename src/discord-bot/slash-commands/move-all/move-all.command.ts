import { SlashCommandPipe } from '@discord-nestjs/common';
import { Command, Handler, IA, InteractionEvent } from '@discord-nestjs/core';
import { Injectable } from '@nestjs/common';
import { MoveAllCommandDto } from './move-all.dto';
import { Guild } from 'discord.js';

@Command({
  name: 'move-all',
  description: 'Move todos usuários para outro canal de voz',
})
@Injectable()
export class MoveAllCommand {
  constructor() {}
  @Handler()
  async onMoveAll(
    @InteractionEvent(SlashCommandPipe) options: MoveAllCommandDto,
    @IA() interaction,
  ) {
    if (interaction.user.id !== '135901738258399232') return 'Sem permissão';

    const guild = interaction.member.guild;

    const channelFrom = guild.voiceStates.cache.find(
      (connectedMember) => connectedMember.id === interaction.user.id,
    )?.channelId;

    const channelTo = guild.channels.cache.get(options.channel_id);

    if (!channelFrom || !channelTo) return 'Canal não encontrado.';

    if (channelFrom === channelTo?.id)
      return 'Não é possível mover membros para o mesmo canal.';

    guild.voiceStates.cache
      .filter((vState) => vState.channelId === channelFrom)
      .map((connectedMember) => {
        connectedMember.setChannel(channelTo);
      });

    return 'Membros movidos!';
  }
}
