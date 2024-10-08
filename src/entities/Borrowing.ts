import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { User } from './User';
import { Book } from './Book';

@Entity()
export class Borrowing {
    id!: number;
    @PrimaryGeneratedColumn()

    @ManyToOne(() => User, user => user.borrowings) 
    @JoinColumn({ name: 'user_id' })
    user!: User;

    @ManyToOne(() => Book, book => book.borrowings)
    @JoinColumn({ name: 'book_id' })
    book!: Book;

    @Column({ type: 'date' })
    borrowed_date!: Date;

    @Column({ type: 'date' })
    due_date!: Date;

    @Column({ type: 'date', nullable: true })
    returned_date?: Date;

    @Column({ nullable: true })
    user_score?: number;
}