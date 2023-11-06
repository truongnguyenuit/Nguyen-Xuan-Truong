import { Resource } from '../entities/resource.entity';
import { DataSource } from 'typeorm';

export const myDataSource = new DataSource({
  type: 'postgres',
  database: 'tech99',
  username: 'postgres',
  password: '8972561',
  logging: true,
  synchronize: false,
  entities: [Resource],
});
