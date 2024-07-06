import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, OneToMany } from 'typeorm';
import { Roles } from './roles';
import { Todo } from './todo';

@Entity()
export class Users {
    @PrimaryGeneratedColumn()
    id?: number;

    @Column()
    username: string = "";

    @Column()
    password: string = "";

    @OneToOne(() => Roles)
    @JoinColumn({ name: "role", referencedColumnName: "id" })
    role!: number;

    @OneToMany(() => Todo, todo => todo.user)
    todos!: Todo[];
}