import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Roles {
    @PrimaryGeneratedColumn()
    id?: number;

    @Column()
    roleName: string = "";

    @Column()
    roleLevel!: number;
}