import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Users } from './users';

@Entity()
export class Todo {
    @PrimaryGeneratedColumn()
    id?: number;

    @Column()
    title: string = "";

    @Column()
    description: string = "";

    @Column()
    completed: boolean = false;

    @Column()
    userId!: number;

    @ManyToOne(() => Users, user => user.todos)
    @JoinColumn({ name: "userId", referencedColumnName: "id" })
    user?: number;
}