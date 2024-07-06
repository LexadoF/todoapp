import bcrypt from 'bcrypt';
import { createDBifNotExists, SyncDatasource } from '../constants/data-source';
import { Users } from '../models/users';
import { Roles } from '../models/roles';

const seedDatabase = async () => {
    await createDBifNotExists();
    await SyncDatasource.initialize();
    const rolesRepository = SyncDatasource.getRepository(Roles);
    const userRepository = SyncDatasource.getRepository(Users);

    const adminRole = rolesRepository.create({ roleName: 'administrator', roleLevel: 0 });
    const userRole = rolesRepository.create({ roleName: 'user', roleLevel: 1 });

    await rolesRepository.save([adminRole, userRole]);

    const hashedPassword = await bcrypt.hash('123', 10);
    const adminUser = userRepository.create({
        username: 'admon',
        password: hashedPassword,
        role: adminRole.id,
    });

    await userRepository.save(adminUser);

    console.log('Database seeded successfully');
    await SyncDatasource.destroy();
};

seedDatabase().catch(error => {
    console.error('Error seeding database:', error);
    process.exit(0);
});
