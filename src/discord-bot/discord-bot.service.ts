import { Injectable } from '@nestjs/common';
import { env } from 'process';
const { TOKEN, CLIENT_ID } = env;

@Injectable()
export class DiscordBotService {}
