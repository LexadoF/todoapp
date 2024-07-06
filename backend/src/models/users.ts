import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Todo } from './todo';

@Entity()
export class Users {
    @PrimaryGeneratedColumn()
    id?: number;

    @Column()
    username: string = "";

    @Column()
    password: string = "";

    @OneToMany(() => Todo, todo => todo.user)
    todos!: Todo[];
}