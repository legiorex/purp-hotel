import { ConfigService } from '@nestjs/config';
import { ITelegramOptions } from 'src/telegram/telegram.interface';

export const telegramConfig = async (configService: ConfigService): Promise<ITelegramOptions> => {
  const token = configService.get<string>('TG_BOT_TOKEN');

  if (!token) {
    throw new Error('Telegram bot token is not provided');
  }

  const chatId = configService.get<string>('CHAT_ID');

  return {
    chatId: chatId || '',
    token,
  };
};
