import {BaseEntity} from 'src/utils/base-entity';
import {Column, Entity, JoinColumn, OneToMany, OneToOne} from 'typeorm';
import {Customer} from '../customer/customer.entity';
import {Health} from './health.entity';
import {Weight} from './weight.entity';

@Entity()
export class Dog extends BaseEntity {
  @Column()
  name: string;

  @Column({nullable: true})
  assignedName?: string;

  @Column({nullable: true})
  passport?: string;

  @Column({nullable: true})
  chipId?: string;

  @Column({nullable: true})
  photo?: string;

  @Column()
  bornAt: Date;

  @OneToOne(
    () => Customer,
    customer => customer.id,
    {nullable: true, eager: true},
  )
  @JoinColumn()
  owner?: Customer;

  @OneToMany(
    () => Weight,
    weight => weight.dog,
    {eager: true},
  )
  weights: Weight[];

  @OneToMany(
    () => Health,
    health => health.dog,
    {eager: true},
  )
  healths: Health[];
}
