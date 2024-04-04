import { BorrowingEntity } from '../../borrowing/entities/borrowing.entity';
import { Entity, Column, PrimaryGeneratedColumn, BaseEntity, OneToMany } from 'typeorm';

@Entity('books')
export class BooksEntity extends BaseEntity {
    @PrimaryGeneratedColumn('uuid', {
        name: 'id',
        primaryKeyConstraintName: 'book_id_pk',
    })
    id: string;

  @Column({ unique: true, type: 'varchar' })
  code: string;

  @Column({ type: 'varchar'})
  title: string;

  @Column({ type: 'varchar'})
  author: string;

  @Column({ type: 'integer'})
  stock: number;

  //Relation
  @OneToMany(() => BorrowingEntity, borrowing => borrowing.book)
  borrowings: BorrowingEntity[];
}