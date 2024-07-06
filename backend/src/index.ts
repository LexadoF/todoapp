import app from './app';
import { initializeDataSource } from './constants/data-source';
import 'reflect-metadata';

const PORT = process.env.PORT || 3000;
const startServer= async (): Promise<void> =>{
    try {
        await initializeDataSource();
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    } catch (error) {
        console.error('Error starting server:', error);
        process.exit(1);
    }
}

startServer();