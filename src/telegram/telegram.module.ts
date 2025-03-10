import { DynamicModule, Global, Module, Provider } from '@nestjs/common';
import { TelegramService } from './telegram.service';
import { ITelegramModuleAsyncOptions } from './telegram.interface';
import { TELEGRAM_OPTIONS } from './telegram.const';

@Global()
@Module({})
export class TelegramModule {
  static forRootAsync(options: ITelegramModuleAsyncOptions): DynamicModule {
    const optionsProvider = this.createOptionsProvider(options);

    return {
      module: TelegramModule,
      imports: options.imports,
      providers: [TelegramService, optionsProvider],
      exports: [TelegramService],
    };
  }

  private static createOptionsProvider(options: ITelegramModuleAsyncOptions): Provider {
    return {
      provide: TELEGRAM_OPTIONS,
      inject: options.inject || [],
      useFactory: async (...args: any[]) => {
        const config = await options.useFactory(...args);
        return config;
      },
    };
  }
}
