import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Borrowing } from './Borrowing';

@Entity()
export class Book {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    title!: string;

    @Column()
    author!: string;

    @Column({unique: true, length: 20})
    isbn!: string;

    @Column({ default: true })
    available: boolean = true;

    @OneToMany(() => Borrowing, borrowing => borrowing.book)
    borrowings?: Borrowing[];
}