import { BorrowingEntity } from '../../borrowing/entities/borrowing.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BeforeInsert,
  Repository,
  DeleteDateColumn,
  UpdateDateColumn,
  CreateDateColumn,
  OneToMany,
  BaseEntity,
} from 'typeorm';

export enum statusMember {
  penalized = 'penalized',
  active = 'active',
}

@Entity('members')
export class MembersEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid', {
    name: 'id',
    primaryKeyConstraintName: 'member_id_pk',
  })
  id: string;

  @Column({
    unique: true,
    type: 'varchar',
    length: 10,
  })
  code: string;

  @Column({ type: 'varchar' })
  name: string;

  @Column({
    type: 'enum',
    enum: statusMember,
    default: statusMember.active,
  })
  status: statusMember;

  @Column({ type: 'varchar' })
  password: string;

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

  // relation
  @OneToMany(() => BorrowingEntity, (borrowing) => borrowing.member)
  borrowings: BorrowingEntity[];
}
