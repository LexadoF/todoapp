import bcrypt from 'bcrypt';
import { createDBifNotExists, SyncDatasource } from '../constants/data-source';
import { Users } from '../models/users';

const seedDatabase = async () => {
    await createDBifNotExists();
    await SyncDatasource.initialize();

    const userRepository = SyncDatasource.getRepository(Users);

    const hashedPassword = await bcrypt.hash('123', 10);
    const adminUser = userRepository.create({
        username: 'admon',
        password: hashedPassword,
    });

    const adminUser2 = userRepository.create({
        username: 'admin',
        password: hashedPassword,
    });

    await userRepository.save(adminUser);
    await userRepository.save(adminUser2);

    console.log('Database seeded successfully');
    await SyncDatasource.destroy();
};

seedDatabase().catch(error => {
    console.error('Error seeding database:', error);
    process.exit(0);
});
