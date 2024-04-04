import { DataSource } from 'typeorm';
import { BorrowingEntity } from './entities/borrowing.entity';


export const borrowingProviders = [
    {
        provide: 'BORROWING_REPOSITORY',
        useFactory: (dataSource: DataSource) =>
            dataSource.getRepository(BorrowingEntity),
        inject: ['DATA_SOURCE'],
    }
];