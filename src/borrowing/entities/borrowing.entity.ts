import { BooksEntity } from "../../books/entities/book.entity";
import { MembersEntity } from "../../members/entities/member.entity";
import { BaseEntity, Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";


export enum statusBorrowing{
    active = 'active',
    returned = 'returned'
}


@Entity('borrowings') // Menentukan nama tabel menjadi 'borrowings'
export class BorrowingEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid', {
    name: 'id',
    primaryKeyConstraintName: 'borrowing_id_pk',
  })
  id: string;

  @Column({
    type: 'enum',
    enum: statusBorrowing,
    default: statusBorrowing.active,
  })
  status: statusBorrowing;

  @Column({type:'uuid',name:'member_id',nullable:true})
  member_id: string

  @Column({type:'uuid',name:'book_id',nullable:true})
  book_id: string

  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamp',
    default: () => 'now()',
  })
  created_at: Date;

  @UpdateDateColumn({
    name: 'updated_at',
    type: 'timestamp',
    default: () => 'now()',
  })
  updated_at: Date;

  @DeleteDateColumn({
    name: 'deleted_at',
    type: 'timestamp',
    nullable: true,
  })
  deleted_at: Date;

  //relation
  @ManyToOne(() => MembersEntity, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'member_id',referencedColumnName:'id' })
  member: MembersEntity;

  @ManyToOne(() => BooksEntity, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'book_id',referencedColumnName:'id'  })
  book: BooksEntity;
}