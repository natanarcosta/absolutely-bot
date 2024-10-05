import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { lastValueFrom } from 'rxjs';

export const VAVA_AUTH_KEY = 'HDEV-54086848-c9f5-4e0f-b67f-6675877b44b6';

@Injectable()
export class ValorantChatBotService {
  constructor(private http: HttpService) {}

  async getStatus() {
    try {
      const res = await lastValueFrom(
        this.http.get(
          'https://api.henrikdev.xyz/valorant/v1/mmr-history/br/pewd/2504',
          {
            headers: {
              Authorization: VAVA_AUTH_KEY,
            },
          },
        ),
      );

      const lastMatch = res.data.data[0];
      const rank = lastMatch.currenttierpatched;
      const mmrChange = lastMatch.mmr_change_to_last_game;

      const lastMatchId = lastMatch.match_id;

      const lastMachData = await lastValueFrom(
        this.http.get(
          'https://api.henrikdev.xyz/valorant/v2/match/' + lastMatchId,
          {
            headers: {
              Authorization: VAVA_AUTH_KEY,
            },
          },
        ),
      );

      const playerData = lastMachData.data.data.players.all_players.find(
        (player) => player.name === 'pewd',
      );

      const { kills, deaths, assists } = playerData.stats;

      return `Rank atual: ${rank}. Última partida: ${kills}/${deaths}/${assists} de ${
        playerData.character
      }. ${mmrChange > 0 ? `+${mmrChange}` : mmrChange} MMR`;
    } catch (e) {
      console.error(e);
      return 'Houve algum erro buscando os dados da Peewdi.';
    }
  }
}
