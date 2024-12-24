import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { NestFactory } from '@nestjs/core';

export async function createRabbitMQMicroservice(
  queue: string,
  rabbitMQUrl: string,
) {
  try {
    const microservice =
      await NestFactory.createMicroservice<MicroserviceOptions>(this, {
        transport: Transport.RMQ,
        options: {
          urls: [rabbitMQUrl],
          queue,
          queueOptions: {
            durable: true,
          },
        },
      });
    await microservice.listen();
    console.log('Connected to RabbitMQ');
  } catch (err) {
    console.error(
      'Failed to connect to RabbitMQ. Retrying in 5 seconds...',
      err,
    );
    setTimeout(() => createRabbitMQMicroservice(queue, rabbitMQUrl), 5000);
  }
}
