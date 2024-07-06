import { config } from 'dotenv';
import path from 'path';

// We load .env from the root dir of the app
config({ path: path.resolve(__dirname, '..', '.env') });

// We export each variable we would need with their corresponding type
export const dbHost: string = process.env.DB_HOST as string;
export const dbUser: string = process.env.DB_USERNAME as string;
export const dbPort: number = parseInt(process.env.DB_PORT as string, 10);
export const dbPassword: string = process.env.DB_PASSWORD as string;
export const dbName: string = process.env.DB_NAME as string;
export const appDefaultPort: number = parseInt(process.env.PORT as string, 10);
