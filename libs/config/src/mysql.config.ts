import { registerAs } from '@nestjs/config';

export default registerAs('mysql', () => ({
  host: process.env.MYSQL_HOST || 'localhost',
  port: process.env.MYSQL_PORT || 3306,
  database: process.env.MYSQL_DATABASE || 'mysql',
  username: process.env.MYSQL_USERNAME || 'mysql',
  password: process.env.MYSQL_PASSWORD || 'mysql',
}));
