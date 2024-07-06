import { DataSource } from 'typeorm';
import { Todo } from '../models/todo';
import { dbHost, dbName, dbPassword, dbPort, dbUser } from './enviromentalSettings';
import mysql from 'mysql2/promise';
import { Users } from '../models/users';


//#region Data source instance

/**
 * Data source config
 * @constant {DataSource} AppDataSource - Database Instance
 */
export const AppDataSource = new DataSource({
    type: 'mysql',
    host: dbHost,
    port: dbPort || 3306,
    username: dbUser,
    password: dbPassword || '',
    database: dbName,
    charset: 'utf8mb4',
    logging: false,
    entities: [
        Todo, Users
    ],
    migrations: [],
    subscribers: [],
});

//#endregion

//#region Data source init function

/**
 * @async
 * @function initializeDataSource
 * @returns {Promise<void>} - This promise will resolve when the data source is initialized but not return anything
 */
export const initializeDataSource = async (): Promise<void> => {
    try {
        await AppDataSource.initialize();
        console.log('Data source initialized');
    } catch (err) {
        console.error(`Failed to initialize data source: ${err}`);
    }
}

//#endregion

//#region all the seeder stuff
export const SyncDatasource = new DataSource({
    type: 'mysql',
    host: dbHost,
    port: dbPort || 3306,
    username: dbUser,
    password: dbPassword || '',
    database: dbName,
    synchronize: true,
    charset: 'utf8mb4',
    logging: false,
    entities: [
        Todo, Users
    ],
    migrations: [],
    subscribers: [],
    dropSchema: true
});

export const createDBifNotExists = async () => {
    const connection = await mysql.createConnection({
        host: dbHost,
        user: dbUser,
        password: dbPassword,
    });

    const databaseName = dbName;

    await connection.query(`CREATE DATABASE IF NOT EXISTS ${databaseName};`);
    await connection.end();
};

//#endregion