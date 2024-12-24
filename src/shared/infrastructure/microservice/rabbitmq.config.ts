import { EnvConfigService } from '@/shared/infrastructure/env-config/env-config.service';
import { ClientProxyFactory, RmqOptions } from '@nestjs/microservices';
import { Transport } from '@nestjs/microservices';

export const rabbitMqConfig = (
  envService: EnvConfigService,
  queue: string,
): RmqOptions => ({
  transport: Transport.RMQ,
  options: {
    urls: [envService.getRabitMqUrl()],
    queue,
    queueOptions: {
      durable: true,
    },
    socketOptions: {
      reconnect: true,
    },
  },
});

export const clientBuilder = (envService: EnvConfigService, queue: string) =>
  ClientProxyFactory.create(rabbitMqConfig(envService, queue));
