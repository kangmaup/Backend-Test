import { ConfigService } from '@nestjs/config';
import { DataSource } from 'typeorm';

const configService: ConfigService<EnvironmentVariables> = new ConfigService();

export const databaseProviders = [
    {
        provide: 'DATA_SOURCE',
        useFactory: async () => {
            const dataSource = new DataSource({
                type: 'postgres',
                host: configService.get<string>('DB_HOST'),
                port: +configService.get<number>('DB_PORT'),
                username: configService.get<string>('DB_USERNAME'),
                password: configService.get<string>('DB_PASSWORD'),
                database: configService.get<string>('DB_NAME'),
                entities: [`${__dirname}/../**/*.entity{.ts,.js}`],
                synchronize: configService.get('DB_SYNC') === 'true',
                logging:
                    configService.get('DB_LOGGING') === 'true' ? true : false,
            });

            return dataSource.initialize();
        },
    },
];
